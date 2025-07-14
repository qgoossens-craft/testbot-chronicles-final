/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'terminal': {
          'bg': '#0d1117',
          'green': '#39d353',
          'blue': '#58a6ff',
          'purple': '#a371f7',
          'orange': '#f78166',
          'gray': '#8b949e',
        },
        'accent': {
          'primary': '#2563eb',
          'secondary': '#7c3aed',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'typing': 'typing 2s steps(20) infinite alternate, blink .7s infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0ch' },
          '100%': { width: '20ch' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}