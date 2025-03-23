import { localPlayerState } from '@/store/gameState'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

const MOUSE_SENSITIVITY = 0.002

const createUpdateMovement = (movementKeys: Set<string>) => () => {
  const keys = movementKeys
  const movement = { x: 0, z: 0 }

  // Update movement state based on keys
  localPlayerState.controls.move.forward = keys.has('KeyW')
  localPlayerState.controls.move.backward = keys.has('KeyS')
  localPlayerState.controls.move.left = keys.has('KeyA')
  localPlayerState.controls.move.right = keys.has('KeyD')

  if (keys.has('KeyW')) movement.z += 1
  if (keys.has('KeyS')) movement.z -= 1
  if (keys.has('KeyA')) movement.x -= 1
  if (keys.has('KeyD')) movement.x += 1

  // Normalize diagonal movement
  if (movement.x !== 0 && movement.z !== 0) {
    const length = Math.sqrt(movement.x * movement.x + movement.z * movement.z)
    movement.x /= length
    movement.z /= length
  }
}

export const MouseControls = () => {
  const [pointerLocked, setPointerLocked] = useState(false)
  const movementKeys = useRef(new Set<string>())
  const { camera, gl } = useThree()

  // Ensure camera uses YXZ order for FPS-style rotations (yaw, pitch, roll)
  useEffect(() => {
    camera.rotation.order = 'YXZ'
  }, [camera])

  // Helper to update camera rotation while keeping roll locked
  const updateCameraRotation = (yaw: number, pitch: number) => {
    // Using YXZ rotation order:
    // 1. Y rotation (yaw/left-right) is applied first
    // 2. X rotation (pitch/up-down) is applied second
    // 3. Z rotation (roll) is locked to zero
    camera.rotation.y -= yaw
    camera.rotation.x -= pitch

    // Clamp vertical rotation to avoid over-rotation
    camera.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, camera.rotation.x)
    )
    // Lock roll - this should never change due to YXZ order, but we'll enforce it
    camera.rotation.z = 0
  }

  useEffect(() => {
    const updateMovement = createUpdateMovement(movementKeys.current)

    const handlePointerLockChange = () => {
      setPointerLocked(document.pointerLockElement === gl.domElement)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!pointerLocked) return

      const movementX = e.movementX || 0
      const movementY = e.movementY || 0

      // Convert mouse movement to radians and apply sensitivity
      const yaw = movementX * MOUSE_SENSITIVITY
      const pitch = movementY * MOUSE_SENSITIVITY

      updateCameraRotation(yaw, pitch)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementKeys.current.add(e.code)
        updateMovement()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementKeys.current.delete(e.code)
        updateMovement()
      }
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      movementKeys.current.clear()
      // Reset movement state on cleanup
      localPlayerState.controls.move.forward = false
      localPlayerState.controls.move.backward = false
      localPlayerState.controls.move.left = false
      localPlayerState.controls.move.right = false
    }
  }, [pointerLocked, camera, gl.domElement])

  return null
}
