import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { proxy, useSnapshot } from 'valtio'
import { Splash } from './components/Splash'
import { Game } from './components/Game'

// State management
export const state = proxy({
  connected: false,
  playerCount: 0,
  inGame: false,
})

// Socket connection
export const socket = io()

const App = () => {
  const snap = useSnapshot(state)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return

    socket.on('connect', () => {
      state.connected = true
    })

    socket.on('disconnect', () => {
      state.connected = false
    })

    socket.on('world:stats', ({ playerCount }) => {
      state.playerCount = playerCount
    })

    setInitialized(true)
  }, [initialized])

  return snap.inGame ? <Game /> : <Splash />
}

export default App
