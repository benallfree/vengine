import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '../../styles/theme.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: vars.space.large,
  gap: vars.space.large,
})

export const title = style({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: vars.colors.primary,
})

export const status = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.small,
})

export const indicator = recipe({
  base: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease',
  },
  variants: {
    connected: {
      true: { backgroundColor: '#22c55e' },
      false: { backgroundColor: '#ef4444' },
    },
  },
})

export const stats = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.text,
})

export const playButton = recipe({
  base: {
    padding: `${vars.space.medium} ${vars.space.large}`,
    fontSize: vars.fontSizes.large,
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: vars.colors.primary,
    color: vars.colors.text,
  },
  variants: {
    connected: {
      true: {
        ':hover': {
          backgroundColor: vars.colors.secondary,
          transform: 'scale(1.05)',
        },
      },
      false: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
})

export const portalButton = style({
  position: 'fixed',
  top: vars.space.medium,
  right: vars.space.medium,
  padding: vars.space.medium,
  color: vars.colors.text,
  textDecoration: 'none',
  fontSize: vars.fontSizes.medium,
  ':hover': {
    color: vars.colors.primary,
  },
})
