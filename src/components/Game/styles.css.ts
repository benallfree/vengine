import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const container = style({
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const joystick = style({
  position: 'absolute',
  bottom: '20px',
  width: '120px',
  height: '120px',
  opacity: 0.5,
  ':first-child': {
    left: '20px',
  },
  ':last-child': {
    right: '20px',
  },
  '@media': {
    '(min-width: 768px)': {
      display: 'none',
    },
  },
})

export const hud = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  padding: vars.space.medium,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pointerEvents: 'none',
})

export const playerCount = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.text,
  pointerEvents: 'auto',
})

export const portalButton = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.text,
  textDecoration: 'none',
  pointerEvents: 'auto',
  ':hover': {
    color: vars.colors.primary,
  },
})
