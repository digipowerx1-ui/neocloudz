import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        amber: '#ffb84d',
        red: '#ff4d4d',
        blue: '#4dc8ff',
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
