import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { gameState } from '../store/gameState'

// Socket connection - moved from App.tsx
export const socket = io()

export const Network = () => {
  useEffect(() => {
    socket.on('connect', () => {
      gameState.connected = true
    })

    socket.on('disconnect', () => {
      gameState.connected = false
    })

    socket.on('world:stats', ({ playerCount }) => {
      gameState.playerCount = playerCount
    })

    // Player movement and look events
    socket.on('player:moved', ({ id, position }) => {
      // Handle other players' movements
      console.log('Player moved:', id, position)
    })

    socket.on('player:looked', ({ id, rotation }) => {
      // Handle other players' rotations
      console.log('Player looked:', id, rotation)
    })

    socket.on('player:left', ({ id }) => {
      // Handle player disconnection
      console.log('Player left:', id)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('world:stats')
      socket.off('player:moved')
      socket.off('player:looked')
      socket.off('player:left')
    }
  }, [])

  // Network component doesn't render anything
  return null
}
