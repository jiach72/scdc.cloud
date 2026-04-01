import React, { useState } from 'react';
import { useEditorStore } from '../stores/editorStore';

const BrowserPreview: React.FC = () => {
  const { browserUrl, setBrowserUrl, toggleBrowser } = useEditorStore();
  const [inputUrl, setInputUrl] = useState(browserUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    setBrowserUrl(url);
    setInputUrl(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNavigate();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-ide-bg border border-ide-border rounded-lg shadow-2xl w-[90vw] h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 h-[40px] border-b border-ide-border flex-shrink-0">
          <span className="text-sm">🌐</span>
          <input
            className="flex-1 bg-ide-input text-ide-text text-sm px-3 py-1.5 rounded outline-none border border-ide-border focus:border-ide-accent"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL..."
          />
          <button
            onClick={handleNavigate}
            className="px-3 py-1.5 bg-ide-accent text-white text-sm rounded hover:opacity-90"
          >
            Go
          </button>
          <button
            onClick={toggleBrowser}
            className="px-2 py-1.5 text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded text-sm"
          >
            ✕
          </button>
        </div>

        {/* Quick links */}
        <div className="flex items-center gap-2 px-3 h-[30px] border-b border-ide-border bg-ide-panel flex-shrink-0">
          <button
            onClick={() => { setInputUrl('http://localhost:3000'); setBrowserUrl('http://localhost:3000'); }}
            className="text-xs text-ide-text-dim hover:text-ide-accent px-2 py-0.5 rounded hover:bg-ide-hover"
          >
            :3000
          </button>
          <button
            onClick={() => { setInputUrl('http://localhost:5173'); setBrowserUrl('http://localhost:5173'); }}
            className="text-xs text-ide-text-dim hover:text-ide-accent px-2 py-0.5 rounded hover:bg-ide-hover"
          >
            :5173
          </button>
          <button
            onClick={() => { setInputUrl('http://localhost:8080'); setBrowserUrl('http://localhost:8080'); }}
            className="text-xs text-ide-text-dim hover:text-ide-accent px-2 py-0.5 rounded hover:bg-ide-hover"
          >
            :8080
          </button>
        </div>

        {/* iframe */}
        <div className="flex-1 relative bg-white">
          <iframe
            src={browserUrl}
            className="absolute inset-0 w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setIsLoading(false)}
            title="Browser Preview"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-ide-bg">
              <span className="text-ide-text-dim animate-pulse">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowserPreview;
