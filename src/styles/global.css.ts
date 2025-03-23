import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle('html, body, #root', {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: vars.colors.background,
  color: vars.colors.text,
  fontFamily: 'system-ui, -apple-system, sans-serif',
})

globalStyle('canvas', {
  touchAction: 'none',
})
