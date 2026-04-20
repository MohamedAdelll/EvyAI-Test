/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        'primary-background': 'var(--color-primary-background)',
        'primary-foreground': 'var(--color-primary-foreground)',
        'primary-border': 'rgb(var(--color-primary-border) / <alpha-value>)',
        'primary-border-hover': 'rgb(var(--color-primary-border-hover) / <alpha-value>)',
        'input-border-focused': 'var(--color-input-border-focused)',

        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',

        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',

        foreground: 'var(--color-foreground)',
        danger: 'var(--color-danger)',

        card: 'var(--color-card-background)',
        'card-2': 'var(--color-card-background2)',
        'card-border': 'var(--color-card-border)',
        'card-hover': 'var(--color-card-background-hover)',

        input: {
          DEFAULT: 'var(--color-input-bg)',
          border: 'var(--color-input-border-default)',
          disabled: 'var(--color-input-bg-disabled)'
        },

        '_-yellow': 'var(--color-_-yellow-80)',
        '_-pink': 'var(--color-_-pink-80)',

        'typography-primary': 'var(--color-typography-primary)',
        'typography-primary-light': 'var(--color-typography-primary-light)',
        'typography-primary-lighter': 'var(--color-typography-primary-lighter)',
        'typography-primary-strong': 'var(--color-typography-primary-strong)',
        'typography-accent': 'var(--color-typography-accent)',
        'typography-accent-strong': 'rgb(var(--color-typography-accent-strong) / <alpha-value>)',
        'typography-stale': 'var(--color-typography-stale)',

        'btn-bg-primary': 'rgb(var(--color-btn-bg-primary) / <alpha-value>)',
        'btn-border-primary': 'var(--color-btn-border-primary)',
        'btn-text-primary': 'rgb(var(--color-btn-text-primary) / <alpha-value>)',
      },

      spacing: {
        0: 'var(--spacing-0)',
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        9: 'var(--spacing-9)',
        10: 'var(--spacing-10)',
        12: 'var(--spacing-12)',
        14: 'var(--spacing-14)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
        32: 'var(--spacing-32)'
      },

      fontSize: {
        '2xs': 'var(--text-2xs)',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)'
      },

      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2'
      },

      borderRadius: {
        none: '0px',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: '9999px'
      },

      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        2: '2px',
        4: '4px',
        8: '8px'
      },

      maxWidth: {
        xs: 'var(--container-2xs)',
        sm: 'var(--container-sm)',
        md: 'var(--container-md)',
        lg: 'var(--container-lg)',
        xl: 'var(--container-xl)',
        '2xl': 'var(--container-2xl)',
        '3xl': 'var(--container-3xl)',
        '5xl': 'var(--container-5xl)',
        full: '100%'
      },

      minWidth: {
        0: '0px',
        full: '100%'
      },

      minHeight: {
        0: '0px',
        full: '100%'
      },

      height: (theme) => ({
        ...theme('spacing'),
        auto: 'auto',
        full: '100%',
        screen: '100vh'
      }),

      width: (theme) => ({
        ...theme('spacing'),
        auto: 'auto',
        full: '100%',
        screen: '100vw'
      })
    }
  },
  plugins: []
}
