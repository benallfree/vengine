import { proxy } from 'valtio'

// State management
export const gameState = proxy({
  connected: false,
  playerCount: 0,
  inGame: false,
  controls: {
    move: {
      forward: false,
      backward: false,
      left: false,
      right: false,
    },
  },
})

export const localPlayerState = proxy({
  id: null,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  controls: {
    move: {
      forward: false,
      backward: false,
      left: false,
      right: false,
    },
  },
})
