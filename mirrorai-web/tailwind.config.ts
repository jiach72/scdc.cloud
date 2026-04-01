/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#09090f',
        bg2: '#0f0f18',
        card: '#14141f',
        'card-hover': '#1c1c2e',
        border: '#252538',
        text: '#e8e8f0',
        dim: '#7878a0',
        orange: '#ff6b35',
        'orange-glow': 'rgba(255,107,53,0.25)',
        green: '#34d399',
        blue: '#60a5fa',
        yellow: '#fbbf24',
        red: '#f87171',
        purple: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
