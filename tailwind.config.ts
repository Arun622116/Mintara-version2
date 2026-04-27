import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:    { DEFAULT: '#22c55e', dark: '#16a34a', light: '#dcfce7' },
        'os-blue': { DEFAULT: '#2081e2', dark: '#1868b7', light: '#ebf3fe' },
        gray: {
          50: '#f8fafc', 100: '#f1f5f9', 150: '#e8edf4', 200: '#e2e8f0',
          300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569',
          700: '#334155', 800: '#1e293b', 900: '#0f172a',
        },
      },
      fontFamily: {
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        xs: '4px', sm: '8px', md: '12px', lg: '16px',
        xl: '20px', '2xl': '24px',
      },
      animation: {
        'fade-in':  'fadeIn .2s ease',
        'fade-up':  'fadeUp .25s ease',
        'scale-in': 'scaleIn .2s ease',
        'shimmer':  'shimmer 1.4s infinite',
        'toast-in': 'toastIn .25s ease',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,.05)',
        sm: '0 1px 3px rgba(0,0,0,.08)',
        md: '0 4px 6px rgba(0,0,0,.07)',
        lg: '0 10px 15px rgba(0,0,0,.08)',
        xl: '0 20px 25px rgba(0,0,0,.1)',
        'card-hover': '0 8px 30px rgba(0,0,0,.12)',
      },
      screens: {
        xs: '480px', sm: '640px', md: '768px',
        lg: '1024px', xl: '1280px', '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

export default config
