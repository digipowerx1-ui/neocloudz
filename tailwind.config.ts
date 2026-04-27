import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0f0a',
        surface: '#0f1410',
        surface2: '#141a14',
        border: 'rgba(255,255,255,0.07)',
        green: {
          DEFAULT: '#2dff7a',
          dim: '#1aaa4e',
          dark: '#0d3320',
        },
        amber: {
          DEFAULT: '#ffb84d',
          dim: '#aa7a1a',
        },
        red: '#ff4d4d',
        blue: {
          DEFAULT: '#4dc8ff',
          dim: '#1a7aaa',
        },
        text: '#c8d4c8',
        muted: '#4a5a4a',
        white: '#f0f5f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
