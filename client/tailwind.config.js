const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        bb: {
          pink: '#ef6fa0',
          violet: '#9b6edc',
          peach: '#f09878',
          dark: '#2d1b4e',
          body: '#6b5080',
          muted: '#a090b8',
        },
      },
      borderRadius: {
        pill: '999px',
        card: '32px',
        'card-sm': '24px',
        input: '999px',
      },
      boxShadow: {
        glass: '0 8px 48px rgba(220,118,168,0.13), 0 2px 12px rgba(178,128,220,0.08)',
        'glass-sm': '0 4px 20px rgba(220,118,168,0.09)',
        'btn-primary': '0 6px 26px rgba(239,111,160,0.40), 0 2px 8px rgba(239,111,160,0.20)',
        'icon-pink': '0 4px 16px rgba(239,111,160,0.34)',
        'icon-violet': '0 4px 16px rgba(155,110,220,0.34)',
        'icon-peach': '0 4px 16px rgba(240,152,120,0.28)',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #ef6fa0 0%, #9b6edc 100%)',
        'grad-pink': 'linear-gradient(135deg, #ef6fa0, #f5a0c0)',
        'grad-violet': 'linear-gradient(135deg, #9b6edc, #b898e8)',
        'grad-peach': 'linear-gradient(135deg, #f09878, #f8b8a0)',
      },
      animation: {
        float: 'bbFloat 3.9s ease-in-out infinite',
        'float-slow': 'bbFloat 6.2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.52s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        bbFloat: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    // include only whichever you're actually using
    nextui(),
  ],
};
