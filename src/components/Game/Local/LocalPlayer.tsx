import { useFrame, useThree } from '@react-three/fiber'
import { forwardRef } from 'react'
import { EntityState } from '../Entity'
import { Player, PlayerHandle, PlayerProps } from '../Player'
import { localPlayerActions } from './actions'

export interface LocalPlayerHandle extends PlayerHandle {}

export interface LocalPlayerProps extends PlayerProps {
  getState: () => EntityState
}

export const LocalPlayer = forwardRef<LocalPlayerHandle, LocalPlayerProps>(
  ({ id = 'local-player', getState }, ref) => {
    const { camera } = useThree()

    useFrame((_, delta) => {
      localPlayerActions.calculateMovement(camera, delta)
    })

    return (
      <Player
        id={id}
        ref={ref}
        getState={getState}
        onCollision={(other) => {}}
      />
    )
  }
)
