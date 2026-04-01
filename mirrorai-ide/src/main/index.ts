import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { spawn, IPty } from 'node-pty';

let mainWindow: BrowserWindow | null = null;
const terminals: Map<string, IPty> = new Map();

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#1e1e1e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    terminals.forEach((pty) => pty.kill());
    terminals.clear();
  });
}

app.whenReady().then(() => {
  setupIPC();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// ─── IPC Handlers ───────────────────────────────────────────────────────────

function setupIPC(): void {
  // Window controls
  ipcMain.on('window:minimize', () => mainWindow?.minimize());
  ipcMain.on('window:maximize', () => {
    if (mainWindow?.isMaximized()) mainWindow.unmaximize();
    else mainWindow?.maximize();
  });
  ipcMain.on('window:close', () => mainWindow?.close());
  ipcMain.handle('window:is-maximized', () => mainWindow?.isMaximized() ?? false);

  // ── File System ─────────────────────────────────────────────────────────

  ipcMain.handle('fs:read-dir', async (_event, dirPath: string) => {
    try {
      const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
      return entries.map((e) => ({
        name: e.name,
        path: path.join(dirPath, e.name),
        isDirectory: e.isDirectory(),
        isFile: e.isFile(),
      }));
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:read-file', async (_event, filePath: string) => {
    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      return { content };
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:write-file', async (_event, filePath: string, content: string) => {
    try {
      await fs.promises.writeFile(filePath, content, 'utf-8');
      return { success: true };
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:create-file', async (_event, filePath: string) => {
    try {
      await fs.promises.writeFile(filePath, '', 'utf-8');
      return { success: true };
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:create-dir', async (_event, dirPath: string) => {
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
      return { success: true };
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:delete', async (_event, targetPath: string) => {
    try {
      const stat = await fs.promises.stat(targetPath);
      if (stat.isDirectory()) {
        await fs.promises.rm(targetPath, { recursive: true, force: true });
      } else {
        await fs.promises.unlink(targetPath);
      }
      return { success: true };
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:rename', async (_event, oldPath: string, newPath: string) => {
    try {
      await fs.promises.rename(oldPath, newPath);
      return { success: true };
    } catch (err) {
      return { error: (err as Error).message };
    }
  });

  ipcMain.handle('fs:exists', async (_event, targetPath: string) => {
    try {
      await fs.promises.access(targetPath);
      return { exists: true };
    } catch {
      return { exists: false };
    }
  });

  // ── Dialog ──────────────────────────────────────────────────────────────

  ipcMain.handle('dialog:open-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory'],
    });
    if (result.canceled) return null;
    return result.filePaths[0];
  });

  // ── Terminal ────────────────────────────────────────────────────────────

  ipcMain.handle('terminal:create', async (event, id: string, cwd?: string) => {
    const shell = process.platform === 'win32' ? 'powershell.exe' : (process.env.SHELL || 'bash');
    const pty = spawn(shell, [], {
      name: 'xterm-256color',
      cols: 80,
      rows: 24,
      cwd: cwd || process.env.HOME || process.env.USERPROFILE,
      env: { ...process.env, TERM: 'xterm-256color' } as Record<string, string>,
    });

    terminals.set(id, pty);

    pty.onData((data: string) => {
      mainWindow?.webContents.send('terminal:data', id, data);
    });

    pty.onExit(({ exitCode }: { exitCode: number }) => {
      mainWindow?.webContents.send('terminal:exit', id, exitCode);
      terminals.delete(id);
    });

    return { success: true };
  });

  ipcMain.on('terminal:write', (_event, id: string, data: string) => {
    terminals.get(id)?.write(data);
  });

  ipcMain.on('terminal:resize', (_event, id: string, cols: number, rows: number) => {
    terminals.get(id)?.resize(cols, rows);
  });

  ipcMain.on('terminal:kill', (_event, id: string) => {
    const pty = terminals.get(id);
    if (pty) {
      pty.kill();
      terminals.delete(id);
    }
  });

  // ── Exec (non-interactive) ─────────────────────────────────────────────

  ipcMain.handle('exec:run', async (_event, command: string, cwd?: string) => {
    return new Promise((resolve) => {
      const shell = process.platform === 'win32' ? 'powershell.exe' : '/bin/bash';
      const child = spawn(shell, ['-c', command], {
        cwd: cwd || process.env.HOME,
        env: process.env as Record<string, string>,
        cols: 120,
        rows: 30,
      });

      let output = '';
      child.onData((data: string) => {
        output += data;
      });

      child.onExit(({ exitCode }: { exitCode: number }) => {
        resolve({ output, exitCode });
      });

      // Safety timeout
      setTimeout(() => {
        child.kill();
        resolve({ output: output + '\n[TIMEOUT]', exitCode: -1 });
      }, 30000);
    });
  });
}
