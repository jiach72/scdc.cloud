import React, { useRef, useEffect, useState } from 'react';
import { useAgentStore, ChatMessage, ToolCall, generateId } from '../stores/agentStore';
import { useEditorStore, APIConfig } from '../stores/editorStore';
import { readFile, writeFile, runCommand } from '../utils/ipc';

// Simple markdown renderer (basic subset)
function renderMarkdown(text: string): string {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n/g, '<br/>');
}

const AgentPanel: React.FC = () => {
  const {
    messages, isStreaming, currentInput,
    addMessage, appendToMessage, setStreaming, setCurrentInput,
    addToolCall, updateToolCall,
  } = useAgentStore();
  const { apiConfigs, activeApiConfigId, projectRoot } = useEditorStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeConfig = apiConfigs.find((c) => c.id === activeApiConfigId);

  const handleSend = async () => {
    const input = currentInput.trim();
    if (!input || isStreaming) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };
    addMessage(userMsg);
    setCurrentInput('');
    setStreaming(true);

    const assistantMsgId = generateId();
    addMessage({
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    });

    try {
      if (activeConfig) {
        await callAPI(assistantMsgId, input, activeConfig);
      } else {
        // Local mock response when no API configured
        await mockResponse(assistantMsgId, input);
      }
    } catch (err) {
      appendToMessage(assistantMsgId, `\n\n**Error:** ${(err as Error).message}`);
    }

    setStreaming(false);
  };

  const callAPI = async (msgId: string, userMessage: string, config: APIConfig) => {
    const apiMessages = messages
      .filter((m) => m.role !== 'system')
      .concat({ id: '', role: 'user', content: userMessage, timestamp: Date.now() })
      .map((m) => ({ role: m.role, content: m.content }));

    // Add system prompt
    apiMessages.unshift({
      role: 'system',
      content: `You are MirrorAI Code, an AI coding assistant. You can read/write files and execute commands.
Project root: ${projectRoot || 'not set'}.
Respond in markdown. When you need to use tools, describe what you're doing clearly.`,
    });

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No response stream');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) appendToMessage(msgId, content);
        } catch { /* skip malformed chunks */ }
      }
    }
  };

  const mockResponse = async (msgId: string, userMessage: string) => {
    const lower = userMessage.toLowerCase();

    // Tool call demo: read file
    const readMatch = lower.match(/(?:read|打开|读取)\s+(.+)/);
    if (readMatch && projectRoot) {
      const toolId = `tool_${Date.now()}`;
      const filePath = readMatch[1].startsWith('/') ? readMatch[1] : `${projectRoot}/${readMatch[1]}`;

      addToolCall(msgId, {
        id: toolId,
        type: 'read',
        description: `Reading file: ${filePath}`,
        input: { path: filePath },
        status: 'running',
      });

      const result = await readFile(filePath);
      updateToolCall(msgId, toolId, {
        status: 'content' in result ? 'done' : 'error',
        output: result,
      });

      if ('content' in result) {
        appendToMessage(msgId, `I've read the file. Here's what's inside:\n\`\`\`\n${result.content}\n\`\`\``);
      } else {
        appendToMessage(msgId, `Failed to read file: ${result.error}`);
      }
      return;
    }

    // Tool call demo: exec command
    const execMatch = lower.match(/(?:run|exec|执行|运行)\s+(.+)/);
    if (execMatch) {
      const toolId = `tool_${Date.now()}`;
      const cmd = execMatch[1];

      addToolCall(msgId, {
        id: toolId,
        type: 'exec',
        description: `Running: ${cmd}`,
        input: { command: cmd },
        status: 'running',
      });

      const result = await runCommand(cmd, projectRoot || undefined);
      updateToolCall(msgId, toolId, {
        status: 'done',
        output: result,
      });

      appendToMessage(msgId, `Command output:\n\`\`\`\n${result.output}\n\`\`\`\nExit code: ${result.exitCode}`);
      return;
    }

    // Default mock response
    const responses = [
      `I'm **MirrorAI Code**, your AI coding assistant! 🤖\n\nI can help you with:\n- 📖 Read and analyze files: \`read filename.ts\`\n- ⚡ Execute commands: \`run npm install\`\n- ✏️ Write and modify code\n- 🔍 Search through your codebase\n\nNo API configured yet. Open **Settings** to add your AI model API key.`,
      `Hello! I see you want help. Here's what I can do:\n\n### File Operations\n- Read files: "read package.json"\n- Write files\n\n### Commands\n- Run: "run ls -la"\n- Execute any shell command\n\n### Code Analysis\n- Explain code\n- Suggest improvements\n\n> 💡 **Tip:** Configure your API in Settings to get real AI responses!`,
      `Got it! I'm ready to help with your code.\n\n**Quick commands:**\n- \`read <file>\` — Read a file\n- \`run <cmd>\` — Execute a command\n\nConfigure an API in ⚙️ Settings to unlock full AI capabilities.`,
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Simulate streaming
    for (let i = 0; i < response.length; i += 3) {
      await new Promise((r) => setTimeout(r, 10));
      appendToMessage(msgId, response.slice(i, i + 3));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTool = (toolId: string) => {
    setExpandedTools((prev) => {
      const next = new Set(prev);
      if (next.has(toolId)) next.delete(toolId);
      else next.add(toolId);
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-[35px] border-b border-ide-border flex-shrink-0">
        <span className="text-xs font-semibold uppercase text-ide-text-dim tracking-wide">🤖 Agent</span>
        {activeConfig && (
          <span className="text-xs text-ide-green">{activeConfig.model}</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-ide-text-dim text-sm mt-8">
            <p className="text-2xl mb-2">🤖</p>
            <p>MirrorAI Agent</p>
            <p className="text-xs mt-2">Ask me anything about your code</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-ide-accent text-white'
                  : 'bg-ide-active text-ide-text agent-message'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
              ) : (
                msg.content
              )}

              {/* Tool calls */}
              {msg.toolCalls?.map((tc) => (
                <div key={tc.id} className="mt-2 border border-ide-border rounded overflow-hidden">
                  <div
                    className="flex items-center gap-2 px-2 py-1 bg-ide-bg cursor-pointer text-xs"
                    onClick={() => toggleTool(tc.id)}
                  >
                    <span>
                      {tc.status === 'running' ? '⏳' : tc.status === 'done' ? '✅' : tc.status === 'error' ? '❌' : '⏸️'}
                    </span>
                    <span className="text-ide-text-dim">{tc.description}</span>
                    <span className="ml-auto text-ide-text-dim">{expandedTools.has(tc.id) ? '▾' : '▸'}</span>
                  </div>
                  {expandedTools.has(tc.id) && (
                    <pre className="p-2 bg-ide-bg text-xs overflow-auto max-h-[200px] text-ide-text">
                      {JSON.stringify(tc.output || tc.input, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="flex items-center gap-2 text-ide-text-dim text-sm">
            <span className="animate-pulse">●</span>
            <span>Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-ide-border p-2 flex-shrink-0">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the agent..."
            rows={2}
            className="flex-1 bg-ide-input text-ide-text text-sm rounded px-3 py-2 outline-none border border-ide-border focus:border-ide-accent resize-none placeholder-ide-text-dim"
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={isStreaming || !currentInput.trim()}
            className="px-3 bg-ide-accent text-white rounded text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            Send
          </button>
        </div>
        <div className="flex items-center justify-between mt-1 px-1">
          <span className="text-[10px] text-ide-text-dim">
            {activeConfig ? `Using ${activeConfig.model}` : 'No API — mock mode'}
          </span>
          <span className="text-[10px] text-ide-text-dim">Enter to send, Shift+Enter for newline</span>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
