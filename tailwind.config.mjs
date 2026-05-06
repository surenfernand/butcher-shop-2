const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '1.5rem',
        DEFAULT: '1.5rem',
        lg: '1.5rem',
        md: '1.5rem',
        sm: '1rem',
        xl: '1.5rem',
      },
      screens: {
        '2xl': '80rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      colors: {
        accent: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        background: 'var(--color-background)',
        border: 'var(--color-border)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-destructive-foreground)',
        },
        foreground: 'var(--color-foreground)',
        input: 'var(--color-input)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        ring: 'var(--color-ring)',
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        'primary-hover': 'var(--color-primary-hover)',
        gold: 'var(--color-gold)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'muted-text': 'var(--color-muted-text)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '4rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
            a: {
              color: 'inherit',
            },
          },
        },
      },
      fontFamily: {
        mono: ['var(--font-epilogue)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['var(--font-epilogue)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-epilogue)', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label-md': ['0.875rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        in: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        out: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 },
        },
      },
      animation: {
        in: 'in 0.2s ease-out',
        out: 'out 0.2s ease-out',
        fadeIn: 'fadeIn .3s ease-in-out',
        fadeOut: 'fadeOut .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'slide-out-to-right': 'slide-out-to-right 0.2s ease-out',
        blink: 'blink 1.4s both infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    }),
  ],
}
