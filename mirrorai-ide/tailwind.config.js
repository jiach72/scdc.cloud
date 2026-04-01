/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'ide-bg': '#1e1e1e',
        'ide-fg': '#cccccc',
        'ide-border': '#3c3c3c',
        'ide-hover': '#2a2d2e',
        'ide-active': '#37373d',
        'ide-accent': '#007acc',
        'ide-panel': '#252526',
        'ide-sidebar': '#252526',
        'ide-tab': '#2d2d2d',
        'ide-tab-active': '#1e1e1e',
        'ide-input': '#3c3c3c',
        'ide-scrollbar': '#424242',
        'ide-text': '#d4d4d4',
        'ide-text-dim': '#858585',
        'ide-green': '#4ec9b0',
        'ide-blue': '#569cd6',
        'ide-yellow': '#dcdcaa',
        'ide-orange': '#ce9178',
        'ide-red': '#f44747',
      },
    },
  },
  plugins: [],
};
