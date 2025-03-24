import { useEffect, useRef } from 'react'
import { localPlayerActions } from '../../actions'
import { localPlayerState } from '../../state'

const DIAGONAL_MOVEMENT = 0.7071067811865476 // 1/√2, precalculated for performance

const updateMovementFromKeys = (keys: Set<string>) => {
  const x = (keys.has('KeyD') ? 1 : 0) - (keys.has('KeyA') ? 1 : 0)
  const z = (keys.has('KeyS') ? 1 : 0) - (keys.has('KeyW') ? 1 : 0)

  // For diagonal movement, both values will be exactly 1, so we can use a constant
  if (x !== 0 && z !== 0) {
    localPlayerState.controls.move = {
      x: x * DIAGONAL_MOVEMENT,
      z: z * DIAGONAL_MOVEMENT,
    }
  } else {
    localPlayerState.controls.move = { x, z }
  }
}

export const Keyboard = () => {
  const movementKeys = useRef(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementKeys.current.add(e.code)
        updateMovementFromKeys(movementKeys.current)
      } else if (e.code === 'KeyV') {
        // Toggle camera mode with smooth transition
        localPlayerActions.toggleCameraMode()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementKeys.current.delete(e.code)
        updateMovementFromKeys(movementKeys.current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      movementKeys.current.clear()
      // Reset movement state on cleanup
      localPlayerState.controls.move = { x: 0, z: 0 }
    }
  }, [])

  return null
}
