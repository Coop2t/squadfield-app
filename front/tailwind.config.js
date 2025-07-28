/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - SQUADFIELD Blue Digital
        primary: {
          50: '#E6F7FF',
          100: '#BAE7FF',
          200: '#91D5FF',
          300: '#69C0FF',
          400: '#40A9FF',
          500: '#1890FF', // Main primary - SQUADFIELD blue
          600: '#096DD9',
          700: '#0050B3',
          800: '#003A8C',
          900: '#002766',
        },
        // Secondary - SQUADFIELD Gold Premium
        secondary: {
          50: '#FFFBE6',
          100: '#FFF1B8',
          200: '#FFE58F',
          300: '#FFD666',
          400: '#FFC53D',
          500: '#FAAD14', // Main secondary - SQUADFIELD gold
          600: '#D48806',
          700: '#AD6800',
          800: '#874D00',
          900: '#613400',
        },
        // Accent - SQUADFIELD Cyber Blue
        accent: {
          50: '#E6FFFB',
          100: '#B5F5EC',
          200: '#87E8DE',
          300: '#5CDBD3',
          400: '#36CFC9',
          500: '#13C2C2', // Main accent - SQUADFIELD cyber
          600: '#08979C',
          700: '#006D75',
          800: '#00474F',
          900: '#002329',
        },
        // Card Rarity Colors (SQUADFIELD style)
        rarity: {
          common: '#9CA3AF',      // Gris argent
          uncommon: '#13C2C2',    // Cyber bleu
          rare: '#1890FF',        // Bleu SQUADFIELD
          epic: '#722ED1',        // Violet premium
          legendary: '#FAAD14',   // Or SQUADFIELD
          mythic: '#FF4D4F',      // Rouge mythique
        },
        // Backgrounds
        surface: {
          light: '#FAFBFC',
          dark: '#0F1419',
          card: '#FFFFFF',
          'card-dark': '#1A1D23',
        },
        // Extended grays
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#BDC1C6',
          500: '#9AA0A6',
          600: '#80868B',
          700: '#5F6368',
          800: '#3C4043',
          900: '#202124',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'system-ui', 'sans-serif'], // Gaming style
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 32px 0 rgba(0, 0, 0, 0.16)',
        'glow': '0 0 20px rgba(24, 144, 255, 0.4)',
        'glow-gold': '0 0 20px rgba(250, 173, 20, 0.5)',
        'glow-cyber': '0 0 20px rgba(19, 194, 194, 0.4)',
        // Card shadows by rarity - SQUADFIELD style
        'card': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'card-common': '0 4px 16px rgba(156, 163, 175, 0.3)',
        'card-uncommon': '0 4px 16px rgba(19, 194, 194, 0.3)',
        'card-rare': '0 4px 16px rgba(24, 144, 255, 0.4)',
        'card-epic': '0 6px 24px rgba(114, 46, 209, 0.4)',
        'card-legendary': '0 8px 32px rgba(250, 173, 20, 0.5)',
        'card-mythic': '0 12px 48px rgba(255, 77, 79, 0.6)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1890FF 0%, #096DD9 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FAAD14 0%, #D48806 100%)',
        'gradient-accent': 'linear-gradient(135deg, #13C2C2 0%, #08979C 100%)',
        'gradient-card-common': 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
        'gradient-card-uncommon': 'linear-gradient(135deg, #13C2C2 0%, #08979C 100%)',
        'gradient-card-rare': 'linear-gradient(135deg, #1890FF 0%, #096DD9 100%)',
        'gradient-card-epic': 'linear-gradient(135deg, #722ED1 0%, #531DAB 100%)',
        'gradient-card-legendary': 'linear-gradient(135deg, #FAAD14 0%, #D48806 100%)',
        'gradient-card-mythic': 'linear-gradient(135deg, #FF4D4F 0%, #CF1322 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0F1419 0%, #1A1D23 100%)',
        'gradient-radial-gold': 'radial-gradient(circle, #FAAD14 0%, #D48806 50%, #AD6800 100%)',
        'gradient-radial-blue': 'radial-gradient(circle, #1890FF 0%, #096DD9 50%, #0050B3 100%)',
        'grid-pattern': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'pulse-glow-gold': 'pulseGlowGold 2s infinite',
        'pulse-glow-mythic': 'pulseGlowMythic 1.5s infinite',
        'card-hover': 'cardHover 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(24, 144, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(24, 144, 255, 0.6)' },
        },
        pulseGlowGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(250, 173, 20, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(250, 173, 20, 0.7)' },
        },
        pulseGlowMythic: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(255, 77, 79, 0.6)' },
          '50%': { boxShadow: '0 0 48px rgba(255, 77, 79, 0.8)' },
        },
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-4px) scale(1.02)' },
        },
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
