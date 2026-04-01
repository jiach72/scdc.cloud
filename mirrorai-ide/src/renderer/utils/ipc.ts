import { ElectronAPI } from '../../main/preload';

export const api: ElectronAPI = (window as any).electronAPI;

export async function readDir(dirPath: string) {
  return api.fs.readDir(dirPath);
}

export async function readFile(filePath: string) {
  return api.fs.readFile(filePath);
}

export async function writeFile(filePath: string, content: string) {
  return api.fs.writeFile(filePath, content);
}

export async function createFile(filePath: string) {
  return api.fs.createFile(filePath);
}

export async function createDir(dirPath: string) {
  return api.fs.createDir(dirPath);
}

export async function deleteFile(targetPath: string) {
  return api.fs.delete(targetPath);
}

export async function renameFile(oldPath: string, newPath: string) {
  return api.fs.rename(oldPath, newPath);
}

export async function fileExists(targetPath: string) {
  return api.fs.exists(targetPath);
}

export async function openFolderDialog() {
  return api.dialog.openFolder();
}

export async function runCommand(command: string, cwd?: string) {
  return api.exec.run(command, cwd);
}

export function createTerminal(id: string, cwd?: string) {
  return api.terminal.create(id, cwd);
}

export function writeToTerminal(id: string, data: string) {
  api.terminal.write(id, data);
}

export function resizeTerminal(id: string, cols: number, rows: number) {
  api.terminal.resize(id, cols, rows);
}

export function killTerminal(id: string) {
  api.terminal.kill(id);
}

export function onTerminalData(callback: (id: string, data: string) => void) {
  api.terminal.onData(callback);
}

export function onTerminalExit(callback: (id: string, exitCode: number) => void) {
  api.terminal.onExit(callback);
}

export function windowMinimize() { api.window.minimize(); }
export function windowMaximize() { api.window.maximize(); }
export function windowClose() { api.window.close(); }
export function windowIsMaximized() { return api.window.isMaximized(); }
