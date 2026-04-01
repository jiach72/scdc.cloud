import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import { useEditorStore } from '../stores/editorStore';
import { createTerminal, writeToTerminal, resizeTerminal, killTerminal, onTerminalData, onTerminalExit } from '../utils/ipc';

let termCounter = 0;

const TerminalPanel: React.FC = () => {
  const {
    terminalIds, activeTerminalId,
    addTerminal, removeTerminal, setActiveTerminal, projectRoot,
  } = useEditorStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<Map<string, { terminal: Terminal; fitAddon: FitAddon }>>(new Map());
  const [ready, setReady] = useState(false);

  // Initialize first terminal
  useEffect(() => {
    if (terminalIds.length === 0) {
      const id = `term_${++termCounter}`;
      addTerminal(id);
    }
  }, []);

  // Setup terminal data listeners
  useEffect(() => {
    onTerminalData((id, data) => {
      const term = termsRef.current.get(id);
      if (term) term.terminal.write(data);
    });

    onTerminalExit((id, exitCode) => {
      const term = termsRef.current.get(id);
      if (term) {
        term.terminal.write(`\r\n[Process exited with code ${exitCode}]\r\n`);
      }
    });
  }, []);

  // Create terminal instance
  const initTerminal = useCallback(async (id: string) => {
    if (!containerRef.current || termsRef.current.has(id)) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: "'Cascadia Code', 'Fira Code', monospace",
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
        cursor: '#aeafad',
        cursorAccent: '#1e1e1e',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
      scrollback: 5000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    termsRef.current.set(id, { terminal: term, fitAddon });

    // Create terminal in main process
    await createTerminal(id, projectRoot || undefined);

    setReady(true);
  }, [projectRoot]);

  // Handle active terminal rendering
  useEffect(() => {
    if (!activeTerminalId || !containerRef.current) return;

    const termData = termsRef.current.get(activeTerminalId);
    if (!termData) {
      initTerminal(activeTerminalId);
      // Wait for creation then attach
      setTimeout(() => {
        const td = termsRef.current.get(activeTerminalId);
        if (td && containerRef.current) {
          containerRef.current.innerHTML = '';
          td.terminal.open(containerRef.current);
          td.fitAddon.fit();

          const dims = td.terminal.cols + 'x' + td.terminal.rows;
          resizeTerminal(activeTerminalId, td.terminal.cols, td.terminal.rows);

          td.terminal.onData((data) => {
            writeToTerminal(activeTerminalId, data);
          });

          td.terminal.onResize(({ cols, rows }) => {
            resizeTerminal(activeTerminalId, cols, rows);
          });
        }
      }, 200);
      return;
    }

    // Reattach existing terminal
    containerRef.current.innerHTML = '';
    termData.terminal.open(containerRef.current);
    termData.fitAddon.fit();
  }, [activeTerminalId]);

  // Resize on window resize
  useEffect(() => {
    const handleResize = () => {
      const termData = activeTerminalId ? termsRef.current.get(activeTerminalId) : null;
      if (termData) termData.fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [activeTerminalId]);

  const handleNewTerminal = () => {
    const id = `term_${++termCounter}`;
    addTerminal(id);
  };

  const handleCloseTerminal = (id: string) => {
    killTerminal(id);
    const termData = termsRef.current.get(id);
    if (termData) {
      termData.terminal.dispose();
      termsRef.current.delete(id);
    }
    removeTerminal(id);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div className="flex items-center bg-ide-tab border-b border-ide-border flex-shrink-0 h-[32px]">
        {terminalIds.map((id) => (
          <div
            key={id}
            onClick={() => setActiveTerminal(id)}
            className={`tab flex items-center gap-2 px-3 h-full text-xs cursor-pointer border-r border-ide-border
              ${id === activeTerminalId
                ? 'bg-ide-tab-active text-ide-text'
                : 'text-ide-text-dim hover:bg-ide-hover'
              }`}
          >
            <span>⌘ {id.replace('term_', 'Terminal ')}</span>
            {terminalIds.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleCloseTerminal(id); }}
                className="w-4 h-4 flex items-center justify-center rounded hover:bg-ide-active text-ide-text-dim hover:text-ide-text"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleNewTerminal}
          className="px-2 h-full text-ide-text-dim hover:text-ide-text hover:bg-ide-hover text-xs"
          title="New Terminal"
        >
          +
        </button>
      </div>

      {/* Terminal */}
      <div ref={containerRef} className="flex-1 overflow-hidden" />
    </div>
  );
};

export default TerminalPanel;
