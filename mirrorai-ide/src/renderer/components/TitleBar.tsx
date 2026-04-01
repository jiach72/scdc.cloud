import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../stores/editorStore';
import { windowMinimize, windowMaximize, windowClose, windowIsMaximized } from '../utils/ipc';

const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const { projectRoot, toggleTerminal, toggleAgentPanel, toggleSettings, toggleBrowser } = useEditorStore();

  useEffect(() => {
    windowIsMaximized().then(setIsMaximized);
    const interval = setInterval(() => {
      windowIsMaximized().then(setIsMaximized);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-8 bg-ide-bg flex items-center justify-between border-b border-ide-border flex-shrink-0"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left: App name + project */}
      <div className="flex items-center px-3 gap-2 text-xs">
        <span className="text-ide-accent font-semibold">⬡ MirrorAI Code</span>
        {projectRoot && (
          <span className="text-ide-text-dim">— {projectRoot.split('/').pop()}</span>
        )}
      </div>

      {/* Center: Toolbar */}
      <div
        className="flex items-center gap-1"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <button
          onClick={toggleTerminal}
          className="px-2 py-1 text-xs text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded transition-colors"
          title="Toggle Terminal (Ctrl+`)"
        >
          ⌘ Terminal
        </button>
        <button
          onClick={toggleAgentPanel}
          className="px-2 py-1 text-xs text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded transition-colors"
          title="Toggle Agent Panel"
        >
          🤖 Agent
        </button>
        <button
          onClick={toggleBrowser}
          className="px-2 py-1 text-xs text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded transition-colors"
          title="Toggle Browser Preview"
        >
          🌐 Browser
        </button>
        <button
          onClick={toggleSettings}
          className="px-2 py-1 text-xs text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded transition-colors"
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Right: Window controls */}
      <div
        className="flex items-center"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <button
          onClick={windowMinimize}
          className="w-12 h-8 flex items-center justify-center hover:bg-ide-hover transition-colors text-ide-text-dim hover:text-ide-text"
        >
          ─
        </button>
        <button
          onClick={windowMaximize}
          className="w-12 h-8 flex items-center justify-center hover:bg-ide-hover transition-colors text-ide-text-dim hover:text-ide-text"
        >
          {isMaximized ? '⧉' : '□'}
        </button>
        <button
          onClick={windowClose}
          className="w-12 h-8 flex items-center justify-center hover:bg-red-600 transition-colors text-ide-text-dim hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
