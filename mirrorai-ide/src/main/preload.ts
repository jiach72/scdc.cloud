import { contextBridge, ipcRenderer } from 'electron';

export interface ElectronAPI {
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    isMaximized: () => Promise<boolean>;
  };
  fs: {
    readDir: (dirPath: string) => Promise<any[] | { error: string }>;
    readFile: (filePath: string) => Promise<{ content?: string; error?: string }>;
    writeFile: (filePath: string, content: string) => Promise<{ success?: boolean; error?: string }>;
    createFile: (filePath: string) => Promise<{ success?: boolean; error?: string }>;
    createDir: (dirPath: string) => Promise<{ success?: boolean; error?: string }>;
    delete: (targetPath: string) => Promise<{ success?: boolean; error?: string }>;
    rename: (oldPath: string, newPath: string) => Promise<{ success?: boolean; error?: string }>;
    exists: (targetPath: string) => Promise<{ exists: boolean }>;
  };
  dialog: {
    openFolder: () => Promise<string | null>;
  };
  terminal: {
    create: (id: string, cwd?: string) => Promise<{ success?: boolean; error?: string }>;
    write: (id: string, data: string) => void;
    resize: (id: string, cols: number, rows: number) => void;
    kill: (id: string) => void;
    onData: (callback: (id: string, data: string) => void) => void;
    onExit: (callback: (id: string, exitCode: number) => void) => void;
  };
  exec: {
    run: (command: string, cwd?: string) => Promise<{ output: string; exitCode: number }>;
  };
  on: (channel: string, callback: (...args: any[]) => void) => void;
}

const electronAPI: ElectronAPI = {
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:is-maximized'),
  },
  fs: {
    readDir: (dirPath) => ipcRenderer.invoke('fs:read-dir', dirPath),
    readFile: (filePath) => ipcRenderer.invoke('fs:read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('fs:write-file', filePath, content),
    createFile: (filePath) => ipcRenderer.invoke('fs:create-file', filePath),
    createDir: (dirPath) => ipcRenderer.invoke('fs:create-dir', dirPath),
    delete: (targetPath) => ipcRenderer.invoke('fs:delete', targetPath),
    rename: (oldPath, newPath) => ipcRenderer.invoke('fs:rename', oldPath, newPath),
    exists: (targetPath) => ipcRenderer.invoke('fs:exists', targetPath),
  },
  dialog: {
    openFolder: () => ipcRenderer.invoke('dialog:open-folder'),
  },
  terminal: {
    create: (id, cwd) => ipcRenderer.invoke('terminal:create', id, cwd),
    write: (id, data) => ipcRenderer.send('terminal:write', id, data),
    resize: (id, cols, rows) => ipcRenderer.send('terminal:resize', id, cols, rows),
    kill: (id) => ipcRenderer.send('terminal:kill', id),
    onData: (callback) => {
      ipcRenderer.on('terminal:data', (_event, id, data) => callback(id, data));
    },
    onExit: (callback) => {
      ipcRenderer.on('terminal:exit', (_event, id, exitCode) => callback(id, exitCode));
    },
  },
  exec: {
    run: (command, cwd) => ipcRenderer.invoke('exec:run', command, cwd),
  },
  on: (channel, callback) => {
    ipcRenderer.on(channel, (_event, ...args) => callback(...args));
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
