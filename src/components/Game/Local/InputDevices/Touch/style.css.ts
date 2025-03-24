import { style } from '@vanilla-extract/css'

export const overlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
})

export const joystick = style({
  position: 'absolute',
  bottom: '20px',
  width: '120px',
  height: '120px',
  opacity: 0.5,
  pointerEvents: 'auto',
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
