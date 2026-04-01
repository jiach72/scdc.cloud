import React, { useState, useCallback } from 'react';
import TitleBar from './components/TitleBar';
import FileTree from './components/FileTree';
import EditorPanel from './components/EditorPanel';
import AgentPanel from './components/AgentPanel';
import TerminalPanel from './components/TerminalPanel';
import BrowserPreview from './components/BrowserPreview';
import SettingsPanel from './components/SettingsPanel';
import { useEditorStore } from './stores/editorStore';

const App: React.FC = () => {
  const {
    fileTreeWidth,
    agentPanelWidth,
    terminalHeight,
    isAgentPanelVisible,
    isTerminalVisible,
    isBrowserVisible,
    isSettingsOpen,
    setFileTreeWidth,
    setAgentPanelWidth,
    setTerminalHeight,
  } = useEditorStore();

  const [resizing, setResizing] = useState<'file' | 'agent' | 'terminal' | null>(null);

  const handleMouseDown = useCallback((type: 'file' | 'agent' | 'terminal') => (e: React.MouseEvent) => {
    e.preventDefault();
    setResizing(type);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = type === 'file' ? fileTreeWidth : agentPanelWidth;
    const startH = terminalHeight;

    const handleMove = (ev: MouseEvent) => {
      if (type === 'file') {
        setFileTreeWidth(startW + ev.clientX - startX);
      } else if (type === 'agent') {
        setAgentPanelWidth(startW - (ev.clientX - startX));
      } else {
        setTerminalHeight(startH - (ev.clientY - startY));
      }
    };

    const handleUp = () => {
      setResizing(null);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  }, [fileTreeWidth, agentPanelWidth, terminalHeight, setFileTreeWidth, setAgentPanelWidth, setTerminalHeight]);

  return (
    <div className="h-screen w-screen flex flex-col bg-ide-bg text-ide-text select-none">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        {/* File Tree */}
        <div style={{ width: fileTreeWidth }} className="flex-shrink-0 bg-ide-sidebar border-r border-ide-border overflow-hidden">
          <FileTree />
        </div>

        {/* File tree resize handle */}
        <div
          className="w-[3px] cursor-col-resize resize-handle bg-ide-border hover:bg-ide-accent flex-shrink-0"
          onMouseDown={handleMouseDown('file')}
        />

        {/* Editor + Terminal area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor */}
          <div className="flex-1 overflow-hidden flex">
            <div className="flex-1 overflow-hidden">
              <EditorPanel />
            </div>

            {/* Agent panel resize handle */}
            {isAgentPanelVisible && (
              <div
                className="w-[3px] cursor-col-resize resize-handle bg-ide-border hover:bg-ide-accent flex-shrink-0"
                onMouseDown={handleMouseDown('agent')}
              />
            )}

            {/* Agent Panel */}
            {isAgentPanelVisible && (
              <div style={{ width: agentPanelWidth }} className="flex-shrink-0 bg-ide-panel border-l border-ide-border overflow-hidden">
                <AgentPanel />
              </div>
            )}
          </div>

          {/* Terminal resize handle */}
          {isTerminalVisible && (
            <div
              className="h-[3px] cursor-row-resize resize-handle bg-ide-border hover:bg-ide-accent"
              onMouseDown={handleMouseDown('terminal')}
            />
          )}

          {/* Terminal */}
          {isTerminalVisible && (
            <div style={{ height: terminalHeight }} className="flex-shrink-0 overflow-hidden bg-ide-panel border-t border-ide-border">
              <TerminalPanel />
            </div>
          )}
        </div>
      </div>

      {/* Browser Preview */}
      {isBrowserVisible && <BrowserPreview />}

      {/* Settings */}
      {isSettingsOpen && <SettingsPanel />}
    </div>
  );
};

export default App;
