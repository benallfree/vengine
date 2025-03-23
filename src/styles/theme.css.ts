import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  colors: {
    background: '#000000',
    text: '#ffffff',
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
  },
  space: {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
})
