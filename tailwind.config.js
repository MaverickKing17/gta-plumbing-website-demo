/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#10243A',
          50: '#E8EDF2',
          100: '#C9D6E3',
          200: '#93AAC4',
          300: '#5E7FA5',
          400: '#3A5B82',
          500: '#234568',
          600: '#1A3650',
          700: '#10243A',
          800: '#0B1A2B',
          900: '#071320',
        },
        brand: {
          DEFAULT: '#1479C9',
          50: '#E8F4FC',
          100: '#C5E5F8',
          200: '#8FCDEF',
          300: '#5AB4E6',
          400: '#2A9BDD',
          500: '#1479C9',
          600: '#1060A3',
          700: '#0C4D82',
          800: '#093B66',
          900: '#062B4A',
        },
        accent: {
          DEFAULT: '#35C5E8',
          50: '#E9FBFD',
          100: '#C7F4FB',
          200: '#8FE9F7',
          300: '#58DEF4',
          400: '#35C5E8',
          500: '#1AB4DC',
          600: '#1293B5',
          700: '#0E728C',
          800: '#0A566B',
          900: '#073E4E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(16, 36, 58, 0.08), 0 1px 2px 0 rgba(16, 36, 58, 0.04)',
        'card-hover': '0 8px 24px 0 rgba(16, 36, 58, 0.12), 0 2px 6px 0 rgba(16, 36, 58, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
