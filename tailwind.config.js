/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wbx: {
          black: '#0b0e11',
          white: '#ffffff',
          accent: '#FCD535',
          'accent-hover': '#f0b90b',
          green: '#0ecb81',
          red: '#f6465d',
          blue: '#3b82f6',
          card: '#1e2329',
          elevated: '#2b3139',
          muted: '#707a8a',
          ink: '#181a20',
          hairline: '#eaecef',
          soft: '#fafafa',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        num: ['IBM Plex Sans', 'JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
