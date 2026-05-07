/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: '#f97316',
        gold: '#f6c453',
        maroon: '#5f0f20',
        temple: '#b91c1c',
        cream: '#fff7ed'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        divine: '0 30px 80px rgba(185, 28, 28, 0.35)',
        gold: '0 20px 60px rgba(246, 196, 83, 0.28)'
      },
      animation: {
        glow: 'glow 2.8s ease-in-out infinite alternate',
        float: 'float 5s ease-in-out infinite',
        ticker: 'ticker 28s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(246,196,83,.55)' },
          '100%': { textShadow: '0 0 28px rgba(249,115,22,.9)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
};
