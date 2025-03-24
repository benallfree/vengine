import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import nipplejs from 'nipplejs'
import { useEffect, useRef } from 'react'
import { localPlayerState } from '../../state'
import * as styles from './style.css'

const MOVEMENT_THRESHOLD = 0.1
const LOOK_THRESHOLD = 0.1
const JOYSTICK_TOLERANCE = 0.1
// 5 degrees in radians
const MIN_LOOK_ANGLE = (5 * Math.PI) / 180

// Helper to check if look value exceeds minimum threshold
const exceedsLookThreshold = (value: number) =>
  Math.abs(value) >= MIN_LOOK_ANGLE

export const Touch = () => {
  const leftJoystickRef = useRef<HTMLDivElement>(null)
  const rightJoystickRef = useRef<HTMLDivElement>(null)
  const { camera } = useThree()

  // Helper to update camera rotation while keeping roll locked
  const updateCameraRotation = (yaw: number, pitch: number) => {
    // Subtract yaw (left/right) from y rotation
    camera.rotation.y -= yaw
    // Subtract pitch (up/down) from x rotation
    camera.rotation.x -= pitch
    // Clamp vertical rotation to avoid over-rotation
    camera.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, camera.rotation.x)
    )
    // Lock roll
    camera.rotation.z = 0
  }

  useEffect(() => {
    if (!leftJoystickRef.current || !rightJoystickRef.current) return

    const leftJoystick = nipplejs.create({
      zone: leftJoystickRef.current,
      mode: 'static',
      position: { left: '25%', bottom: '25%' },
      color: 'white',
      size: 120,
    })

    const rightJoystick = nipplejs.create({
      zone: rightJoystickRef.current,
      mode: 'static',
      position: { right: '25%', bottom: '25%' },
      color: 'white',
      size: 120,
    })

    const handleMove = (data: any) => {
      const force = data.force < 1 ? data.force : 1
      const angle = (data.angle.radian + Math.PI) % (2 * Math.PI)

      if (force > MOVEMENT_THRESHOLD) {
        const x = Math.cos(angle) * force
        const z = Math.sin(angle) * force

        // Update movement state based on joystick angle with tolerance
        localPlayerState.controls.move.forward = z > JOYSTICK_TOLERANCE
        localPlayerState.controls.move.backward = z < -JOYSTICK_TOLERANCE
        localPlayerState.controls.move.left = x < -JOYSTICK_TOLERANCE
        localPlayerState.controls.move.right = x > JOYSTICK_TOLERANCE
      } else {
        // Reset movement state when joystick is released or below threshold
        localPlayerState.controls.move.forward = false
        localPlayerState.controls.move.backward = false
        localPlayerState.controls.move.left = false
        localPlayerState.controls.move.right = false
      }
    }

    const handleLook = (data: any) => {
      const force = data.force < 1 ? data.force : 1
      const angle = (data.angle.radian + Math.PI) % (2 * Math.PI)

      if (force > LOOK_THRESHOLD) {
        // x controls yaw (left/right)
        const yaw = Math.cos(angle) * force
        // y controls pitch (up/down)
        const pitch = Math.sin(angle) * force

        // Only update camera rotation if movement exceeds minimum angle
        if (exceedsLookThreshold(yaw) || exceedsLookThreshold(pitch)) {
          updateCameraRotation(yaw, pitch)
        }
      }
    }

    leftJoystick.on('move', handleMove)
    leftJoystick.on('end', () => {
      // Reset movement state when joystick is released
      localPlayerState.controls.move.forward = false
      localPlayerState.controls.move.backward = false
      localPlayerState.controls.move.left = false
      localPlayerState.controls.move.right = false
    })
    rightJoystick.on('move', handleLook)

    return () => {
      leftJoystick.destroy()
      rightJoystick.destroy()
    }
  }, [camera])

  return (
    <Html fullscreen>
      <div
        className={styles.joystick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <div ref={leftJoystickRef} className={styles.joystick} />
      <div ref={rightJoystickRef} className={styles.joystick} />
    </Html>
  )
}
