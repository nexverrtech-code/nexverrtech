import type { Config } from 'tailwindcss';

/**
 * Colors are declared as CSS variables in `src/styles/tokens.css` and referenced
 * here, so the palette has exactly one source of truth.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        base: 'var(--nx-bg)',
        surface: {
          DEFAULT: 'var(--nx-surface)',
          raised: 'var(--nx-surface-raised)',
          deep: 'var(--nx-bg-secondary)',
        },
        brand: {
          blue: 'var(--nx-blue)',
          electric: 'var(--nx-electric)',
          cyan: 'var(--nx-cyan)',
          violet: 'var(--nx-violet)',
          purple: 'var(--nx-purple)',
        },
        ink: {
          DEFAULT: 'var(--nx-text)',
          muted: 'var(--nx-text-muted)',
          faint: 'var(--nx-text-faint)',
        },
        hairline: 'var(--nx-border)',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Fluid type: never smaller than mobile, never larger than desktop.
        'display': ['clamp(2.375rem, 1.5rem + 4vw, 4.375rem)', { lineHeight: '1.06', letterSpacing: '-0.032em' }],
        'section': ['clamp(1.875rem, 1.25rem + 2.6vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.024em' }],
        'sub': ['clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.016em' }],
        'lead': ['clamp(0.9688rem, 0.92rem + 0.22vw, 1.125rem)', { lineHeight: '1.65' }],
      },
      maxWidth: {
        content: '1320px',
        prose: '68ch',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #00C8FF 0%, #006AF5 45%, #5220E8 75%, #7B1FFF 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, rgba(0,200,255,0.16) 0%, rgba(0,106,245,0.14) 45%, rgba(82,32,232,0.12) 75%, rgba(123,31,255,0.14) 100%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,200,255,0.18), 0 18px 60px -20px rgba(0,106,245,0.55)',
        lift: '0 24px 70px -32px rgba(2, 8, 30, 0.95)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.025)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        shimmer: {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        breathe: 'breathe 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 5s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
