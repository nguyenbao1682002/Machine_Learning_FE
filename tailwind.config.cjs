import { generateAlphaBackgroundStyles } from './src/shared/utils/tailwind/index'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: '-apple-system, "system-ui", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      },

      textColor: {
        'kc-primary': 'var(--text-kc-primary)',
        'kc-secondary': 'var(--text-kc-secondary)',
        'kc-tertiary': 'var(--text-kc-tertiary)',
        'kc-primary-reverse': 'var(--text-kc-primary-reverse)',
        'kc-sub-1': 'var(--text-kc-sub-1)',
      },

      backgroundColor: {
        'kc-primary': 'var(--bg-kc-primary)',
        'kc-card': 'var(--bg-kc-card)',
      },

      borderColor: {
        'kc-primary': 'var(--border-kc-primary)',
      },

      borderRadius: {
        'kc-primary': 'var(--rounded-kc-primary)',
      },

      colors: {
        'kc-highlight': 'var(--kc-highlight)',
        'kc-hover-highlight': 'var(--kc-hover-highlight)',
        'kc-alpha-10': 'var(--bg-kc-alpha-10)',
        'kc-alpha-20': 'var(--bg-kc-alpha-20)',
        'kc-alpha-30': 'var(--bg-kc-alpha-30)',
        'kc-alpha-40': 'var(--bg-kc-alpha-40)',
        'kc-alpha-50': 'var(--bg-kc-alpha-50)',
        'kc-alpha-60': 'var(--bg-kc-alpha-60)',
        'kc-alpha-70': 'var(--bg-kc-alpha-70)',
        'kc-alpha-80': 'var(--bg-kc-alpha-80)',
        'kc-alpha-90': 'var(--bg-kc-alpha-90)',
        'kc-alpha-100': 'var(--bg-kc-alpha-100)',
        'kc-input': 'var(--bg-kc-input)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.alpha-5': generateAlphaBackgroundStyles(5),
        '.alpha-10': generateAlphaBackgroundStyles(10),
        '.alpha-20': generateAlphaBackgroundStyles(20),
        '.alpha-30': generateAlphaBackgroundStyles(30),
        '.alpha-40': generateAlphaBackgroundStyles(40),
        '.alpha-50': generateAlphaBackgroundStyles(50),
        '.alpha-60': generateAlphaBackgroundStyles(60),
        '.alpha-70': generateAlphaBackgroundStyles(70),
        '.alpha-80': generateAlphaBackgroundStyles(80),
        '.alpha-90': generateAlphaBackgroundStyles(90),
        '.clickable': {},
      })
    },
  ],
}
