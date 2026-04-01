import React, { useEffect, useRef, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { useEditorStore } from '../stores/editorStore';
import { writeFile } from '../utils/ipc';

// Monaco editor worker setup
(self as any).MonacoEnvironment = {
  getWorker: (_moduleId: string, label: string) => {
    const getWorkerUrl = (workerPath: string) => {
      return new URL(`/monaco-editor/min/vs/${workerPath}`, import.meta.url).href;
    };
    switch (label) {
      case 'json':
        return new Worker(getWorkerUrl('language/json/json.worker.js'), { type: 'module' });
      case 'css':
      case 'scss':
      case 'less':
        return new Worker(getWorkerUrl('language/css/css.worker.js'), { type: 'module' });
      case 'html':
      case 'handlebars':
      case 'razor':
        return new Worker(getWorkerUrl('language/html/html.worker.js'), { type: 'module' });
      case 'typescript':
      case 'javascript':
        return new Worker(getWorkerUrl('language/typescript/ts.worker.js'), { type: 'module' });
      default:
        return new Worker(getWorkerUrl('editor/editor.worker.js'), { type: 'module' });
    }
  },
};

const EditorPanel: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const modelsRef = useRef<Map<string, monaco.editor.ITextModel>>(new Map());
  const {
    tabs, activeTabId, setActiveTab, closeTab,
    updateTabContent, setTabDirty,
  } = useEditorStore();

  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Initialize Monaco
  useEffect(() => {
    if (!editorRef.current) return;

    monaco.editor.defineTheme('mirrorai-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#aeafad',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
      },
    });

    monacoRef.current = monaco.editor.create(editorRef.current, {
      value: '',
      language: 'plaintext',
      theme: 'mirrorai-dark',
      fontSize: 14,
      fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace",
      lineNumbers: 'on',
      minimap: { enabled: true, maxColumn: 80 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
      tabSize: 2,
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
      suggest: { showKeywords: true },
      quickSuggestions: true,
      folding: true,
      glyphMargin: true,
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    });

    // Ctrl+S save
    monacoRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const state = useEditorStore.getState();
      const tab = state.tabs.find((t) => t.id === state.activeTabId);
      if (tab && tab.isDirty) {
        saveFile(tab);
      }
    });

    return () => {
      monacoRef.current?.dispose();
      modelsRef.current.forEach((m) => m.dispose());
    };
  }, []);

  // Handle tab switching
  useEffect(() => {
    const editor = monacoRef.current;
    if (!editor) return;

    if (!activeTab) {
      editor.setModel(null);
      return;
    }

    let model = modelsRef.current.get(activeTab.filePath);
    if (!model) {
      const uri = monaco.Uri.parse(`file://${activeTab.filePath}`);
      model = monaco.editor.createModel(activeTab.content, activeTab.language, uri);
      modelsRef.current.set(activeTab.filePath, model);

      model.onDidChangeContent(() => {
        const content = model!.getValue();
        updateTabContent(activeTab.id, content);
        setTabDirty(activeTab.id, true);
      });
    }

    editor.setModel(model);
  }, [activeTabId]);

  // Sync model content when tab content changes externally
  useEffect(() => {
    if (!activeTab) return;
    const model = modelsRef.current.get(activeTab.filePath);
    if (model && model.getValue() !== activeTab.content) {
      model.setValue(activeTab.content);
    }
  }, [activeTab?.content]);

  const saveFile = async (tab: typeof activeTab) => {
    if (!tab) return;
    const model = modelsRef.current.get(tab.filePath);
    const content = model?.getValue() || tab.content;
    await writeFile(tab.filePath, content);
    setTabDirty(tab.id, false);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    closeTab(tabId);
  };

  // Welcome screen when no tabs
  if (tabs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-ide-bg">
        <div className="text-center">
          <div className="text-6xl mb-4">⬡</div>
          <h1 className="text-2xl font-semibold text-ide-text mb-2">MirrorAI Code</h1>
          <p className="text-ide-text-dim text-sm mb-6">AI-Powered Lightweight IDE</p>
          <div className="flex flex-col gap-2 text-ide-text-dim text-sm">
            <p><kbd className="px-2 py-1 bg-ide-panel rounded text-xs">Ctrl+N</kbd> New File</p>
            <p><kbd className="px-2 py-1 bg-ide-panel rounded text-xs">Ctrl+O</kbd> Open Folder</p>
            <p><kbd className="px-2 py-1 bg-ide-panel rounded text-xs">Ctrl+S</kbd> Save</p>
            <p><kbd className="px-2 py-1 bg-ide-panel rounded text-xs">Ctrl+`</kbd> Toggle Terminal</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-ide-bg">
      {/* Tab bar */}
      <div className="flex items-center bg-ide-tab border-b border-ide-border flex-shrink-0 overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab flex items-center gap-2 px-3 h-[35px] text-sm cursor-pointer border-r border-ide-border whitespace-nowrap
              ${tab.id === activeTabId
                ? 'bg-ide-tab-active text-ide-text border-t-2 border-t-ide-accent'
                : 'text-ide-text-dim hover:bg-ide-hover'
              }`}
          >
            <span className="truncate max-w-[150px]">{tab.name}</span>
            {tab.isDirty && <span className="w-2 h-2 rounded-full bg-ide-accent flex-shrink-0" />}
            <button
              onClick={(e) => handleCloseTab(e, tab.id)}
              className="ml-1 w-5 h-5 flex items-center justify-center rounded hover:bg-ide-active text-ide-text-dim hover:text-ide-text text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Monaco Editor */}
      <div ref={editorRef} className="flex-1" />
    </div>
  );
};

export default EditorPanel;
