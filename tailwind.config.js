/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#D4A574', // warm rose gold
        'primary-foreground': '#FEFCF8', // warm white
        
        // Secondary Colors
        'secondary': '#8B4B3B', // rich terracotta
        'secondary-foreground': '#FEFCF8', // warm white
        
        // Accent Colors
        'accent': '#F7E7CE', // soft champagne
        'accent-foreground': '#2C1810', // deep brown
        
        // Background Colors
        'background': '#FEFCF8', // warm white
        'surface': '#F8F5F0', // elevated surface
        
        // Text Colors
        'text-primary': '#2C1810', // deep brown
        'text-secondary': '#6B5B4F', // medium brown
        
        // State Colors
        'success': '#7B8F47', // muted sage green
        'success-foreground': '#FEFCF8', // warm white
        
        'warning': '#C17817', // warm amber
        'warning-foreground': '#FEFCF8', // warm white
        
        'error': '#A84832', // sophisticated burgundy
        'error-foreground': '#FEFCF8', // warm white
        
        // Border Colors
        'border': 'rgba(44, 24, 16, 0.12)', // text primary at 12% opacity
        'border-light': 'rgba(44, 24, 16, 0.08)', // text primary at 8% opacity
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(44, 24, 16, 0.08)',
        'md': '0 4px 16px rgba(44, 24, 16, 0.12)',
        'lg': '0 8px 24px rgba(44, 24, 16, 0.16)',
        'xl': '0 12px 32px rgba(44, 24, 16, 0.20)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '300': '300',
        '400': '400',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}