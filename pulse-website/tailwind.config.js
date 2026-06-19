/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pulse: {
          blue: '#3B82F6',
          'blue-mid': '#2563EB',
          'blue-dark': '#1D4ED8',
          'blue-deep': '#1E3A8A',
          green: '#10B981',
          'green-mid': '#059669',
          'green-dark': '#065F46',
          cyan: '#06B6D4',
          dark: '#0A0F1E',
          darker: '#060A12',
          surface: '#111827',
          'surface-light': '#1F2937',
          'surface-lighter': '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'wave-slow': 'waveSlow 12s ease-in-out infinite',
        'wave-mid': 'waveMid 8s ease-in-out infinite',
        'wave-fast': 'waveFast 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        waveSlow: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateX(-20px) translateY(10px) rotate(1deg)' },
          '66%': { transform: 'translateX(15px) translateY(-8px) rotate(-0.5deg)' },
        },
        waveMid: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(25px) translateY(-15px)' },
        },
        waveFast: {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-15px) scaleY(1.1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        dataFlow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-pulse': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0F1E 0%, #060A12 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.05) 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, rgba(10,15,30,0) 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(59,130,246,0.3)',
        'glow-green': '0 0 30px rgba(16,185,129,0.3)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
