import { forwardRef } from 'react'
import { Entity, EntityHandle, EntityProps } from './Entity'

// Player physical dimensions
export const PLAYER_HEIGHT = 2
export const PLAYER_RADIUS = 0.4
export const EYE_HEIGHT = PLAYER_HEIGHT * 0.85 // Approximately at eye level

// Player movement
export const BASE_MOVEMENT_SPEED = 5 // units per second

export interface PlayerProps extends EntityProps {
  color?: string
  height?: number
  radius?: number
}

export interface PlayerHandle extends EntityHandle {}

export const Player = forwardRef<PlayerHandle, PlayerProps>(
  (
    {
      getState,
      onCollision,
      color = '#ff0000',
      height = PLAYER_HEIGHT,
      radius = PLAYER_RADIUS,
      id = 'player',
    },
    ref
  ) => {
    return (
      <Entity id={id} ref={ref} getState={getState} onCollision={onCollision}>
        {/* Capsule is oriented along Y-axis, front faces -Z */}
        <capsuleGeometry args={[radius, height, 4]} />
        <meshStandardMaterial color={color} />
      </Entity>
    )
  }
)
