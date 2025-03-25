import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { touchState } from './state'

const FORCE_THRESHOLD = 0.001
const ROTATION_SPEED = 0.05
const MOVE_SPEED = 0.1

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

  // Helper to update camera position based on move input
  const updateCameraPosition = (angle: number, force: number) => {
    if (!force || force <= FORCE_THRESHOLD) return

    // Normalize force to 0-1 range
    const normalizedForce = Math.min(
      Math.max((force - FORCE_THRESHOLD) / (1 - FORCE_THRESHOLD), 0),
      1
    )

    // Calculate movement direction based on camera orientation
    const speed = MOVE_SPEED * normalizedForce
    // Left/right controls X, up/down controls Z
    const moveX = Math.cos(angle) * speed
    const moveZ = Math.sin(-angle) * speed
    const moveY = 0 // No vertical movement

    camera.position.x += moveX
    camera.position.z += moveZ
    camera.position.y += moveY
  }

  useFrame((_, delta) => {
    // Handle look joystick
    const { force: lookForce, angle: lookAngle } = touch.look
    if (lookForce && lookAngle) {
      const normalizedForce = Math.min(
        Math.max((lookForce - FORCE_THRESHOLD) / (1 - FORCE_THRESHOLD), 0),
        1
      )
      if (normalizedForce > 0) {
        const angle = (lookAngle.radian + Math.PI) % (2 * Math.PI)
        const speed = ROTATION_SPEED * normalizedForce
        const deltaYaw = -Math.cos(angle) * speed
        const deltaPitch = Math.sin(angle) * speed
        updateCameraRotation(deltaYaw, deltaPitch)
      }
    }

    // Handle move joystick
    const { force: moveForce, angle: moveAngle } = touch.move
    if (moveForce && moveAngle) {
      updateCameraPosition(moveAngle.radian, moveForce)
    }
  })

  return null
}
