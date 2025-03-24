import { proxy } from 'valtio'

interface GameState {
  connected: boolean
  playerCount: number
  inGame: boolean
}

export const gameState = proxy<GameState>({
  connected: false,
  playerCount: 0,
  inGame: false,
})
