import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

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
