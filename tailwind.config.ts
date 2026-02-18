import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#050508',
        'void-dark':  '#0A0A0F',
        'neon-cyan':  '#00D4FF',
        'neon-blue':  '#4D9FFF',
        'neon-soft':  '#9DC4FF',
        'light-blue': '#9DC4FF',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        marquee:    'marquee 22s linear infinite',
        float:      'float 8s ease-in-out infinite',
        'float-2':  'float 10s ease-in-out 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-up':  'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'slide-down': 'slideDown 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both',
        'toast-in': 'toastIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        fadeUp:    { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        toastIn:   { from: { opacity: '0', transform: 'translateX(60px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
