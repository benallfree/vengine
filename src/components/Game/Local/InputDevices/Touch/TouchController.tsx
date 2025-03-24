import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { touchState } from './state'

const FORCE_THRESHOLD = 0.001
const ROTATION_SPEED = 0.05

export const TouchController = () => {
  const { camera } = useThree()
  const touch = useSnapshot(touchState)

  // Ensure camera uses YXZ order for FPS-style rotations
  useEffect(() => {
    camera.rotation.order = 'YXZ'
  }, [camera])

  // Helper to update camera rotation while keeping roll locked
  const updateCameraRotation = (yaw: number, pitch: number) => {
    camera.rotation.y -= yaw
    camera.rotation.x -= pitch

    // Clamp vertical rotation
    camera.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, camera.rotation.x)
    )
    // Lock roll
    camera.rotation.z = 0
  }

  useFrame(() => {
    if (!touch.angle || !touch.force) return
    if (touch.force <= FORCE_THRESHOLD) return

    const angle = (touch.angle.radian + Math.PI) % (2 * Math.PI)
    // Normalize force to 0-1 range
    const normalizedForce = Math.min(
      Math.max((touch.force - FORCE_THRESHOLD) / (1 - FORCE_THRESHOLD), 0),
      1
    )
    const speed = ROTATION_SPEED * normalizedForce
    const deltaYaw = -Math.cos(angle) * speed
    const deltaPitch = Math.sin(angle) * speed

    updateCameraRotation(deltaYaw, deltaPitch)
  })

  return null
}
