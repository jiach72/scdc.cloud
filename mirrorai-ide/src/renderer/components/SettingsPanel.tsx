import React, { useState } from 'react';
import { useEditorStore, APIConfig } from '../stores/editorStore';

const SettingsPanel: React.FC = () => {
  const {
    toggleSettings, apiConfigs, activeApiConfigId,
    addApiConfig, removeApiConfig, updateApiConfig, setActiveApiConfig,
  } = useEditorStore();

  const [newConfig, setNewConfig] = useState({
    name: '',
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
    model: 'gpt-4o',
  });

  const handleAdd = () => {
    if (!newConfig.name.trim() || !newConfig.apiKey.trim()) return;
    const config: APIConfig = {
      id: `api_${Date.now()}`,
      ...newConfig,
    };
    addApiConfig(config);
    setNewConfig({ name: '', baseUrl: 'https://api.openai.com/v1', apiKey: '', model: 'gpt-4o' });
  };

  const presets = [
    { name: 'OpenAI', baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o' },
    { name: 'Anthropic', baseUrl: 'https://api.anthropic.com/v1', model: 'claude-3-5-sonnet-20241022' },
    { name: 'DeepSeek', baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-coder' },
    { name: 'Ollama (Local)', baseUrl: 'http://localhost:11434/v1', model: 'codellama' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-ide-bg border border-ide-border rounded-lg shadow-2xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-[44px] border-b border-ide-border flex-shrink-0">
          <h2 className="text-sm font-semibold text-ide-text">⚙️ Settings</h2>
          <button
            onClick={toggleSettings}
            className="text-ide-text-dim hover:text-ide-text hover:bg-ide-hover rounded px-2 py-1 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* API Configs */}
          <section>
            <h3 className="text-sm font-semibold text-ide-text mb-3">API Configurations</h3>

            {/* Existing configs */}
            {apiConfigs.length > 0 && (
              <div className="space-y-2 mb-4">
                {apiConfigs.map((config) => (
                  <div
                    key={config.id}
                    className={`flex items-center gap-3 p-3 rounded border ${
                      config.id === activeApiConfigId
                        ? 'border-ide-accent bg-ide-accent/10'
                        : 'border-ide-border bg-ide-panel'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-ide-text">{config.name}</span>
                        <span className="text-xs text-ide-text-dim">{config.model}</span>
                        {config.id === activeApiConfigId && (
                          <span className="text-[10px] bg-ide-accent text-white px-1.5 py-0.5 rounded">Active</span>
                        )}
                      </div>
                      <span className="text-xs text-ide-text-dim">{config.baseUrl}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setActiveApiConfig(config.id)}
                        className={`px-2 py-1 text-xs rounded ${
                          config.id === activeApiConfigId
                            ? 'bg-ide-accent text-white'
                            : 'bg-ide-active text-ide-text hover:bg-ide-hover'
                        }`}
                      >
                        Use
                      </button>
                      <button
                        onClick={() => removeApiConfig(config.id)}
                        className="px-2 py-1 text-xs rounded text-ide-red hover:bg-ide-active"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-3">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setNewConfig({ ...newConfig, name: preset.name, baseUrl: preset.baseUrl, model: preset.model })}
                  className="px-3 py-1 text-xs rounded border border-ide-border text-ide-text-dim hover:text-ide-text hover:bg-ide-hover"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* New config form */}
            <div className="space-y-2 p-3 bg-ide-panel rounded border border-ide-border">
              <input
                className="w-full bg-ide-input text-ide-text text-sm px-3 py-2 rounded outline-none border border-ide-border focus:border-ide-accent"
                placeholder="Name (e.g., OpenAI)"
                value={newConfig.name}
                onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
              />
              <input
                className="w-full bg-ide-input text-ide-text text-sm px-3 py-2 rounded outline-none border border-ide-border focus:border-ide-accent"
                placeholder="Base URL"
                value={newConfig.baseUrl}
                onChange={(e) => setNewConfig({ ...newConfig, baseUrl: e.target.value })}
              />
              <input
                type="password"
                className="w-full bg-ide-input text-ide-text text-sm px-3 py-2 rounded outline-none border border-ide-border focus:border-ide-accent"
                placeholder="API Key"
                value={newConfig.apiKey}
                onChange={(e) => setNewConfig({ ...newConfig, apiKey: e.target.value })}
              />
              <input
                className="w-full bg-ide-input text-ide-text text-sm px-3 py-2 rounded outline-none border border-ide-border focus:border-ide-accent"
                placeholder="Model (e.g., gpt-4o)"
                value={newConfig.model}
                onChange={(e) => setNewConfig({ ...newConfig, model: e.target.value })}
              />
              <button
                onClick={handleAdd}
                className="w-full py-2 bg-ide-accent text-white text-sm rounded hover:opacity-90 disabled:opacity-50"
                disabled={!newConfig.name.trim() || !newConfig.apiKey.trim()}
              >
                Add Configuration
              </button>
            </div>
          </section>

          {/* Keyboard shortcuts */}
          <section>
            <h3 className="text-sm font-semibold text-ide-text mb-3">Keyboard Shortcuts</h3>
            <div className="space-y-1 text-sm">
              {[
                ['Ctrl+S', 'Save file'],
                ['Ctrl+N', 'New file'],
                ['Ctrl+`', 'Toggle terminal'],
                ['Ctrl+F', 'Find in editor'],
                ['Ctrl+H', 'Find and replace'],
                ['Ctrl+P', 'Quick open file'],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-ide-text-dim">{desc}</span>
                  <kbd className="px-2 py-0.5 bg-ide-panel border border-ide-border rounded text-xs text-ide-text">{key}</kbd>
                </div>
              ))}
            </div>
          </section>

          {/* About */}
          <section>
            <h3 className="text-sm font-semibold text-ide-text mb-2">About</h3>
            <p className="text-xs text-ide-text-dim">
              MirrorAI Code IDE v0.1.0<br />
              AI-Powered Lightweight IDE<br />
              Built with Electron + React + Monaco Editor
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
