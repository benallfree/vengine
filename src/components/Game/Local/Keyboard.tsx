import { useEffect, useRef } from 'react'
import { localPlayerActions } from './actions'

export const Keyboard = () => {
  const movementKeys = useRef(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementKeys.current.add(e.code)
        localPlayerActions.updateMovementState(movementKeys.current)
      } else if (e.code === 'KeyV') {
        // Toggle camera mode with smooth transition
        localPlayerActions.toggleCameraMode()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementKeys.current.delete(e.code)
        localPlayerActions.updateMovementState(movementKeys.current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      movementKeys.current.clear()
      // Reset movement state on cleanup
      localPlayerActions.updateMovementState(new Set())
    }
  }, [])

  return null
}
