const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // RTL Support
      rtl: {
        '.rtl-grid': {
          '@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4': {},
        }
      },
      // Responsive Typography
      fontSize: {
        'fluid-sm': 'clamp(0.75rem, 2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.25rem)',
        'fluid-lg': 'clamp(1.25rem, 4vw, 1.5rem)',
      },
      // Animation Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      }
    },
  },
  plugins: [
    // Custom RTL variant
    function({ addVariant }) {
      addVariant('rtl', '[dir="rtl"] &');
    }
  ],
  // Enable dark mode
  darkMode: 'class',
}
