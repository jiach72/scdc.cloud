import { create } from 'zustand';

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  isFile: boolean;
  children?: FileEntry[];
}

export interface Tab {
  id: string;
  filePath: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
}

interface EditorState {
  // Project
  projectRoot: string | null;
  fileTree: FileEntry[];
  expandedDirs: Set<string>;

  // Tabs
  tabs: Tab[];
  activeTabId: string | null;

  // Terminal
  terminalHeight: number;
  isTerminalVisible: boolean;
  terminalIds: string[];
  activeTerminalId: string | null;

  // Agent panel
  agentPanelWidth: number;
  isAgentPanelVisible: boolean;

  // File tree
  fileTreeWidth: number;

  // Browser preview
  browserUrl: string;
  isBrowserVisible: boolean;

  // Settings
  isSettingsOpen: boolean;
  apiConfigs: APIConfig[];
  activeApiConfigId: string | null;

  // Actions
  setProjectRoot: (root: string) => void;
  setFileTree: (tree: FileEntry[]) => void;
  toggleDirectory: (dirPath: string) => void;
  addTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabContent: (tabId: string, content: string) => void;
  setTabDirty: (tabId: string, isDirty: boolean) => void;
  setTerminalHeight: (height: number) => void;
  toggleTerminal: () => void;
  addTerminal: (id: string) => void;
  removeTerminal: (id: string) => void;
  setActiveTerminal: (id: string) => void;
  setAgentPanelWidth: (width: number) => void;
  toggleAgentPanel: () => void;
  setFileTreeWidth: (width: number) => void;
  setBrowserUrl: (url: string) => void;
  toggleBrowser: () => void;
  toggleSettings: () => void;
  addApiConfig: (config: APIConfig) => void;
  removeApiConfig: (id: string) => void;
  updateApiConfig: (id: string, config: Partial<APIConfig>) => void;
  setActiveApiConfig: (id: string) => void;
}

export interface APIConfig {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
}

function getLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    json: 'json', html: 'html', htm: 'html', css: 'css', scss: 'scss',
    md: 'markdown', py: 'python', rb: 'ruby', go: 'go', rs: 'rust',
    java: 'java', c: 'c', cpp: 'cpp', h: 'c', hpp: 'cpp',
    sh: 'shell', bash: 'shell', yml: 'yaml', yaml: 'yaml',
    xml: 'xml', sql: 'sql', php: 'php', swift: 'swift', kt: 'kotlin',
    dockerfile: 'dockerfile', toml: 'ini', ini: 'ini',
  };
  return langMap[ext] || 'plaintext';
}

export const useEditorStore = create<EditorState>((set, get) => ({
  projectRoot: null,
  fileTree: [],
  expandedDirs: new Set<string>(),
  tabs: [],
  activeTabId: null,
  terminalHeight: 250,
  isTerminalVisible: true,
  terminalIds: [],
  activeTerminalId: null,
  agentPanelWidth: 350,
  isAgentPanelVisible: true,
  fileTreeWidth: 240,
  browserUrl: 'http://localhost:3000',
  isBrowserVisible: false,
  isSettingsOpen: false,
  apiConfigs: [],
  activeApiConfigId: null,

  setProjectRoot: (root) => set({ projectRoot: root }),
  setFileTree: (tree) => set({ fileTree: tree }),

  toggleDirectory: (dirPath) => set((state) => {
    const next = new Set(state.expandedDirs);
    if (next.has(dirPath)) next.delete(dirPath);
    else next.add(dirPath);
    return { expandedDirs: next };
  }),

  addTab: (tab) => set((state) => {
    const existing = state.tabs.find((t) => t.filePath === tab.filePath);
    if (existing) return { activeTabId: existing.id };
    return {
      tabs: [...state.tabs, tab],
      activeTabId: tab.id,
    };
  }),

  closeTab: (tabId) => set((state) => {
    const idx = state.tabs.findIndex((t) => t.id === tabId);
    const newTabs = state.tabs.filter((t) => t.id !== tabId);
    let newActiveId = state.activeTabId;
    if (state.activeTabId === tabId) {
      if (newTabs.length > 0) {
        const newIdx = Math.min(idx, newTabs.length - 1);
        newActiveId = newTabs[newIdx].id;
      } else {
        newActiveId = null;
      }
    }
    return { tabs: newTabs, activeTabId: newActiveId };
  }),

  setActiveTab: (tabId) => set({ activeTabId: tabId }),

  updateTabContent: (tabId, content) => set((state) => ({
    tabs: state.tabs.map((t) => t.id === tabId ? { ...t, content } : t),
  })),

  setTabDirty: (tabId, isDirty) => set((state) => ({
    tabs: state.tabs.map((t) => t.id === tabId ? { ...t, isDirty } : t),
  })),

  setTerminalHeight: (height) => set({ terminalHeight: Math.max(100, Math.min(height, 600)) }),
  toggleTerminal: () => set((s) => ({ isTerminalVisible: !s.isTerminalVisible })),

  addTerminal: (id) => set((s) => ({
    terminalIds: [...s.terminalIds, id],
    activeTerminalId: id,
  })),

  removeTerminal: (id) => set((s) => {
    const ids = s.terminalIds.filter((tid) => tid !== id);
    return {
      terminalIds: ids,
      activeTerminalId: s.activeTerminalId === id
        ? (ids[ids.length - 1] || null)
        : s.activeTerminalId,
    };
  }),

  setActiveTerminal: (id) => set({ activeTerminalId: id }),

  setAgentPanelWidth: (width) => set({ agentPanelWidth: Math.max(250, Math.min(width, 600)) }),
  toggleAgentPanel: () => set((s) => ({ isAgentPanelVisible: !s.isAgentPanelVisible })),
  setFileTreeWidth: (width) => set({ fileTreeWidth: Math.max(150, Math.min(width, 500)) }),

  setBrowserUrl: (url) => set({ browserUrl: url }),
  toggleBrowser: () => set((s) => ({ isBrowserVisible: !s.isBrowserVisible })),

  toggleSettings: () => set((s) => ({ isSettingsOpen: !s.isSettingsOpen })),

  addApiConfig: (config) => set((s) => ({ apiConfigs: [...s.apiConfigs, config] })),
  removeApiConfig: (id) => set((s) => ({
    apiConfigs: s.apiConfigs.filter((c) => c.id !== id),
    activeApiConfigId: s.activeApiConfigId === id ? null : s.activeApiConfigId,
  })),
  updateApiConfig: (id, config) => set((s) => ({
    apiConfigs: s.apiConfigs.map((c) => c.id === id ? { ...c, ...config } : c),
  })),
  setActiveApiConfig: (id) => set({ activeApiConfigId: id }),
}));

export { getLanguage };
