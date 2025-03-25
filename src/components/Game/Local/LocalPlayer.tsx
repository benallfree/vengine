import { forwardRef, useEffect } from 'react'
import { EntityState } from '../Entity'
import { getObjectIds } from '../Physics/objectId'
import { Player, PlayerHandle, PlayerProps } from '../Player'

export interface LocalPlayerHandle extends PlayerHandle {}

export interface LocalPlayerProps extends PlayerProps {
  getState: () => EntityState
}

export const LocalPlayer = forwardRef<LocalPlayerHandle, LocalPlayerProps>(
  ({ id = 'local-player', getState }, ref) => {
    useEffect(() => {
      const entityId = getObjectIds(ref)
      console.log(`Local Player ${entityId} created`)
    }, [])

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
