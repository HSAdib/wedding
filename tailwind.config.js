/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F7F4EB',
          200: '#EFECE0',
        },
        botanical: {
          light: '#6B8E70',
          DEFAULT: '#3F5844',
          dark: '#243327',
          deep: '#18241A',
        },
        gold: {
          light: '#EAD79B',
          DEFAULT: '#C5A059',
          dark: '#9A7B38',
        },
        charcoal: {
          light: '#4A5568',
          DEFAULT: '#222823',
          dark: '#111512',
        }
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(36, 51, 39, 0.08)',
        'wax': '0 8px 20px -4px rgba(197, 160, 89, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(197, 160, 89, 0.4)' },
          '50%': { opacity: '0.85', boxShadow: '0 0 0 8px rgba(197, 160, 89, 0)' },
        },
      },
    },
  },
  plugins: [],
}
