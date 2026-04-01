import React, { useEffect, useState, useCallback } from 'react';
import { useEditorStore, FileEntry, Tab, getLanguage } from '../stores/editorStore';
import { readDir, readFile, createFile, createDir, deleteFile, renameFile, openFolderDialog } from '../utils/ipc';
import { getFileIcon } from '../utils/helpers';

let tabCounter = 0;

const FileTree: React.FC = () => {
  const {
    projectRoot, fileTree, expandedDirs,
    setProjectRoot, setFileTree, toggleDirectory,
    addTab, setActiveTab, tabs,
  } = useEditorStore();

  const [contextMenu, setContextMenu] = useState<{
    x: number; y: number; path: string; isDir: boolean;
  } | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemParent, setNewItemParent] = useState<string | null>(null);
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');

  const loadTree = useCallback(async (root: string) => {
    const loadDir = async (dirPath: string): Promise<FileEntry[]> => {
      const entries = await readDir(dirPath);
      if (Array.isArray(entries)) {
        return entries.sort((a, b) => {
          if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
          return a.name.localeCompare(b.name);
        });
      }
      return [];
    };

    const buildTree = async (dirPath: string): Promise<FileEntry[]> => {
      const entries = await loadDir(dirPath);
      for (const entry of entries) {
        if (entry.isDirectory && expandedDirs.has(entry.path)) {
          entry.children = await buildTree(entry.path);
        }
      }
      return entries;
    };

    const tree = await buildTree(root);
    setFileTree(tree);
  }, [expandedDirs, setFileTree]);

  useEffect(() => {
    if (projectRoot) loadTree(projectRoot);
  }, [projectRoot, expandedDirs, loadTree]);

  const handleOpenFolder = async () => {
    const folder = await openFolderDialog();
    if (folder) setProjectRoot(folder);
  };

  const handleFileClick = async (filePath: string, name: string) => {
    const result = await readFile(filePath);
    if ('content' in result && result.content !== undefined) {
      const existingTab = tabs.find((t) => t.filePath === filePath);
      if (existingTab) {
        setActiveTab(existingTab.id);
        return;
      }
      const tab: Tab = {
        id: `tab_${++tabCounter}`,
        filePath,
        name,
        content: result.content,
        language: getLanguage(name),
        isDirty: false,
      };
      addTab(tab);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, path: string, isDir: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, path, isDir });
  };

  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const handler = () => closeContextMenu();
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleNewFile = (parentPath: string) => {
    closeContextMenu();
    setNewItemParent(parentPath);
    setNewItemType('file');
    setNewItemName('');
  };

  const handleNewFolder = (parentPath: string) => {
    closeContextMenu();
    setNewItemParent(parentPath);
    setNewItemType('folder');
    setNewItemName('');
  };

  const handleCreateItem = async () => {
    if (!newItemParent || !newItemName.trim()) return;
    const fullPath = `${newItemParent}/${newItemName.trim()}`;
    if (newItemType === 'file') {
      await createFile(fullPath);
    } else {
      await createDir(fullPath);
    }
    setNewItemParent(null);
    setNewItemName('');
    if (projectRoot) loadTree(projectRoot);
  };

  const handleRename = (path: string) => {
    closeContextMenu();
    const name = path.split('/').pop() || '';
    setRenaming(path);
    setRenameValue(name);
  };

  const handleRenameSubmit = async () => {
    if (!renaming || !renameValue.trim()) return;
    const parent = renaming.substring(0, renaming.lastIndexOf('/'));
    const newPath = `${parent}/${renameValue.trim()}`;
    await renameFile(renaming, newPath);
    setRenaming(null);
    if (projectRoot) loadTree(projectRoot);
  };

  const handleDelete = async (path: string) => {
    closeContextMenu();
    if (confirm(`确定删除 ${path.split('/').pop()}？`)) {
      await deleteFile(path);
      if (projectRoot) loadTree(projectRoot);
    }
  };

  const renderEntry = (entry: FileEntry, depth: number = 0) => {
    const isExpanded = expandedDirs.has(entry.path);
    const icon = getFileIcon(entry.name, entry.isDirectory);

    return (
      <div key={entry.path}>
        <div
          className="flex items-center h-[26px] cursor-pointer hover:bg-ide-hover group text-sm"
          style={{ paddingLeft: depth * 16 + 8 }}
          onClick={() => {
            if (entry.isDirectory) toggleDirectory(entry.path);
            else handleFileClick(entry.path, entry.name);
          }}
          onContextMenu={(e) => handleContextMenu(e, entry.path, entry.isDirectory)}
        >
          {entry.isDirectory && (
            <span className="w-4 text-ide-text-dim text-xs mr-1">
              {isExpanded ? '▾' : '▸'}
            </span>
          )}
          {!entry.isDirectory && <span className="w-4 mr-1" />}
          <span className="mr-1.5 text-sm">{icon}</span>
          {renaming === entry.path ? (
            <input
              autoFocus
              className="bg-ide-input text-ide-text text-sm px-1 py-0.5 border border-ide-accent rounded outline-none flex-1"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit();
                if (e.key === 'Escape') setRenaming(null);
              }}
              onBlur={handleRenameSubmit}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate text-ide-text">{entry.name}</span>
          )}
        </div>
        {entry.isDirectory && isExpanded && entry.children?.map((child) =>
          renderEntry(child, depth + 1)
        )}
        {newItemParent === entry.path && (
          <div style={{ paddingLeft: (depth + 1) * 16 + 8 }} className="flex items-center h-[26px]">
            <span className="w-4 mr-1" />
            <span className="mr-1.5 text-sm">{newItemType === 'file' ? '📄' : '📁'}</span>
            <input
              autoFocus
              className="bg-ide-input text-ide-text text-sm px-1 py-0.5 border border-ide-accent rounded outline-none flex-1"
              placeholder={newItemType === 'file' ? '文件名...' : '文件夹名...'}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateItem();
                if (e.key === 'Escape') setNewItemParent(null);
              }}
              onBlur={() => {
                if (newItemName.trim()) handleCreateItem();
                else setNewItemParent(null);
              }}
            />
          </div>
        )}
      </div>
    );
  };

  if (!projectRoot) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-3 h-[35px] border-b border-ide-border flex-shrink-0">
          <span className="text-xs font-semibold uppercase text-ide-text-dim tracking-wide">Explorer</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3">
          <span className="text-4xl">📂</span>
          <p className="text-ide-text-dim text-sm text-center">No folder opened</p>
          <button
            onClick={handleOpenFolder}
            className="px-4 py-2 bg-ide-accent text-white text-sm rounded hover:opacity-90 transition-opacity"
          >
            Open Folder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 h-[35px] border-b border-ide-border flex-shrink-0">
        <span className="text-xs font-semibold uppercase text-ide-text-dim tracking-wide">
          {projectRoot.split('/').pop()}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => handleNewFile(projectRoot)}
            className="w-6 h-6 flex items-center justify-center text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded text-xs"
            title="New File"
          >
            📄+
          </button>
          <button
            onClick={() => handleNewFolder(projectRoot)}
            className="w-6 h-6 flex items-center justify-center text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded text-xs"
            title="New Folder"
          >
            📁+
          </button>
          <button
            onClick={() => loadTree(projectRoot)}
            className="w-6 h-6 flex items-center justify-center text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded text-xs"
            title="Refresh"
          >
            🔄
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-1">
        {fileTree.map((entry) => renderEntry(entry, 0))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-item" onClick={() => handleNewFile(contextMenu.isDir ? contextMenu.path : contextMenu.path.substring(0, contextMenu.path.lastIndexOf('/')) || projectRoot!)}>
            📄 New File
          </div>
          <div className="context-menu-item" onClick={() => handleNewFolder(contextMenu.isDir ? contextMenu.path : contextMenu.path.substring(0, contextMenu.path.lastIndexOf('/')) || projectRoot!)}>
            📁 New Folder
          </div>
          <div className="context-menu-separator" />
          <div className="context-menu-item" onClick={() => handleRename(contextMenu.path)}>
            ✏️ Rename
          </div>
          <div className="context-menu-item" onClick={() => handleDelete(contextMenu.path)} style={{ color: '#f44747' }}>
            🗑️ Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default FileTree;
