/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'flip-y': 'flipY 6s ease-in-out infinite',
        'flip-x': 'flipX 8s ease-in-out infinite',
        'fadeIn': 'fadeIn 1s ease-in',
        'fall': 'fall 3s ease-in forwards',
        'bloom': 'bloom 2s ease-out forwards',
      },
      keyframes: {
        flipY: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        flipX: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fall: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0) scale(1) rotate(0deg)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(100vh) scale(0.3) rotate(720deg)',
          },
        },
        bloom: {
          '0%': {
            opacity: '1',
            transform: 'translate(0, 0) scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(var(--tx), var(--ty)) scale(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
