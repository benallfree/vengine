import { style } from '@vanilla-extract/css'

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
