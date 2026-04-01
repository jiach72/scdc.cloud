import { create } from 'zustand';

export interface ToolCall {
  id: string;
  type: 'read' | 'write' | 'exec' | 'search' | 'diff';
  description: string;
  input: any;
  output?: any;
  status: 'pending' | 'running' | 'done' | 'error';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls?: ToolCall[];
  timestamp: number;
}

interface AgentState {
  messages: ChatMessage[];
  isStreaming: boolean;
  currentInput: string;
  modelInfo: { provider: string; model: string } | null;

  addMessage: (msg: ChatMessage) => void;
  updateMessage: (id: string, update: Partial<ChatMessage>) => void;
  appendToMessage: (id: string, content: string) => void;
  setStreaming: (streaming: boolean) => void;
  setCurrentInput: (input: string) => void;
  setModelInfo: (info: { provider: string; model: string } | null) => void;
  clearMessages: () => void;
  addToolCall: (msgId: string, toolCall: ToolCall) => void;
  updateToolCall: (msgId: string, toolId: string, update: Partial<ToolCall>) => void;
}

let msgCounter = 0;

export const useAgentStore = create<AgentState>((set) => ({
  messages: [],
  isStreaming: false,
  currentInput: '',
  modelInfo: null,

  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),

  updateMessage: (id, update) => set((s) => ({
    messages: s.messages.map((m) => m.id === id ? { ...m, ...update } : m),
  })),

  appendToMessage: (id, content) => set((s) => ({
    messages: s.messages.map((m) =>
      m.id === id ? { ...m, content: m.content + content } : m
    ),
  })),

  setStreaming: (streaming) => set({ isStreaming: streaming }),
  setCurrentInput: (input) => set({ currentInput: input }),
  setModelInfo: (info) => set({ modelInfo: info }),
  clearMessages: () => set({ messages: [] }),

  addToolCall: (msgId, toolCall) => set((s) => ({
    messages: s.messages.map((m) =>
      m.id === msgId
        ? { ...m, toolCalls: [...(m.toolCalls || []), toolCall] }
        : m
    ),
  })),

  updateToolCall: (msgId, toolId, update) => set((s) => ({
    messages: s.messages.map((m) =>
      m.id === msgId
        ? {
            ...m,
            toolCalls: (m.toolCalls || []).map((tc) =>
              tc.id === toolId ? { ...tc, ...update } : tc
            ),
          }
        : m
    ),
  })),
}));

export function generateId(): string {
  return `msg_${Date.now()}_${++msgCounter}`;
}
