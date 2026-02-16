import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        dark: {
          1: 'hsl(var(--dark-1) / <alpha-value>)',
          2: 'hsl(var(--dark-2) / <alpha-value>)',
          3: 'hsl(var(--dark-3) / <alpha-value>)',
          4: 'hsl(var(--dark-4) / <alpha-value>)',
        },
        blue: {
          1: '#6E6BFF',
        },
        sky: {
          1: '#C7D2FE',
          2: '#E0E7FF',
          3: '#EEF2FF',
        },
        orange: {
          1: '#FF9F6B',
        },
        purple: {
          1: '#7C5CFF',
        },
        yellow: {
          1: '#F6C177',
        },
        violet: {
          1: '#7C5CFF',
          2: '#A18BFF',
          3: '#5B49F5',
        },
        slate: {
          1: 'hsl(var(--slate-1) / <alpha-value>)',
          2: 'hsl(var(--slate-2) / <alpha-value>)',
          3: 'hsl(var(--slate-3) / <alpha-value>)',
        },
        glass: {
          1: 'hsl(var(--glass-1) / <alpha-value>)',
          2: 'hsl(var(--glass-2) / <alpha-value>)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'hero-light': "radial-gradient(80% 120% at 10% 0%, rgba(124, 92, 255, 0.18), transparent 60%), radial-gradient(60% 80% at 90% 10%, rgba(76, 201, 240, 0.12), transparent 55%), linear-gradient(135deg, rgba(247, 248, 255, 0.95), rgba(233, 238, 255, 0.9))",
        'app-light': "radial-gradient(120% 120% at 10% 0%, rgba(124, 92, 255, 0.12), transparent 55%), radial-gradient(100% 140% at 90% 10%, rgba(76, 201, 240, 0.08), transparent 60%), linear-gradient(160deg, #f7f8ff 0%, #eef1ff 55%, #e6eaff 100%)",
        hero: "radial-gradient(80% 120% at 10% 0%, rgba(124, 92, 255, 0.35), transparent 60%), radial-gradient(60% 80% at 90% 10%, rgba(76, 201, 240, 0.18), transparent 55%), linear-gradient(135deg, rgba(16, 18, 32, 0.9), rgba(9, 11, 23, 0.95))",
        app: "radial-gradient(120% 120% at 10% 0%, rgba(124, 92, 255, 0.18), transparent 55%), radial-gradient(100% 140% at 90% 10%, rgba(76, 201, 240, 0.12), transparent 60%), linear-gradient(160deg, #080b16 0%, #0b1020 50%, #0c1122 100%)",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;