import { forwardRef } from 'react'
import { Mesh } from 'three'

// Player physical dimensions
export const PLAYER_HEIGHT = 2
export const PLAYER_RADIUS = 0.5
export const EYE_HEIGHT = PLAYER_HEIGHT * 0.85 // Approximately at eye level

// Player movement
export const BASE_MOVEMENT_SPEED = 5 // units per second

interface PlayerProps {
  position?: [number, number, number]
  color?: string
  height?: number
  radius?: number
}

export const Player = forwardRef<Mesh, PlayerProps>(
  (
    {
      position = [0, PLAYER_HEIGHT, 0],
      color = '#ff0000',
      height = PLAYER_HEIGHT,
      radius = PLAYER_RADIUS,
    },
    ref
  ) => {
    return (
      <mesh ref={ref} position={position}>
        <capsuleGeometry args={[radius, height, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }
)
