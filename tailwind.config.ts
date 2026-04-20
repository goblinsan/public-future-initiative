import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1a2f4e',
          'navy-dark': '#111f35',
          'navy-light': '#243d61',
          blue: '#2655a0',
          'blue-light': '#4a7cc9',
          'blue-muted': '#d6e4f7',
          slate: '#5a7592',
          'slate-light': '#e8eef4',
          amber: '#b87333',
          'amber-light': '#f5e6c8',
          'amber-muted': '#fdf6ec',
          cream: '#faf9f7',
          'cream-dark': '#f0ede8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-lg': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-md': ['1.375rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-xl': ['1.25rem', { lineHeight: '1.7' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
        'label-md': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '600' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'content': '65ch',
        'prose': '72ch',
        'page': '80rem',
        'wide': '90rem',
      },
      borderRadius: {
        'sm': '4px',
        'card': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(26, 47, 78, 0.08), 0 1px 2px -1px rgba(26, 47, 78, 0.06)',
        'card-hover': '0 4px 12px 0 rgba(26, 47, 78, 0.12), 0 2px 4px -2px rgba(26, 47, 78, 0.08)',
        'modal': '0 20px 48px -12px rgba(26, 47, 78, 0.2)',
        'nav': '0 1px 3px 0 rgba(26, 47, 78, 0.06)',
      },
      typography: {
        civic: {
          css: {
            '--tw-prose-body': '#1e293b',
            '--tw-prose-headings': '#1a2f4e',
            '--tw-prose-links': '#2655a0',
            '--tw-prose-bold': '#0f172a',
            '--tw-prose-counters': '#5a7592',
            '--tw-prose-bullets': '#5a7592',
            '--tw-prose-hr': '#e2e8f0',
            '--tw-prose-quotes': '#1a2f4e',
            '--tw-prose-quote-borders': '#2655a0',
            '--tw-prose-captions': '#64748b',
            '--tw-prose-code': '#1a2f4e',
            '--tw-prose-pre-code': '#e2e8f0',
            '--tw-prose-pre-bg': '#1a2f4e',
            '--tw-prose-th-borders': '#cbd5e1',
            '--tw-prose-td-borders': '#e2e8f0',
            maxWidth: '72ch',
            lineHeight: '1.75',
            h1: { fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', letterSpacing: '-0.02em' },
            h2: { fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '600', letterSpacing: '-0.015em' },
            h3: { fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '600' },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
