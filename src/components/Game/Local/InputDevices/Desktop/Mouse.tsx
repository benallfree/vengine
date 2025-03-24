import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

const MOUSE_SENSITIVITY = 0.002

export const Mouse = () => {
  const [pointerLocked, setPointerLocked] = useState(false)
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

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [pointerLocked, camera, gl.domElement])

  return null
}
