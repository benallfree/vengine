import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import nipplejs from 'nipplejs'
import { useEffect, useRef, useState } from 'react'
import { localPlayerState } from '../../store/gameState'
import * as styles from './styles.css'

const MOVEMENT_THRESHOLD = 0.1
const LOOK_THRESHOLD = 0.1
const MOUSE_SENSITIVITY = 0.002
const JOYSTICK_TOLERANCE = 0.1
// 5 degrees in radians
const MIN_LOOK_ANGLE = (5 * Math.PI) / 180

// Helper to check if look value exceeds minimum threshold
const exceedsLookThreshold = (value: number) =>
  Math.abs(value) >= MIN_LOOK_ANGLE

export const Controls = () => {
  const leftJoystickRef = useRef<HTMLDivElement>(null)
  const rightJoystickRef = useRef<HTMLDivElement>(null)
  const [pointerLocked, setPointerLocked] = useState(false)
  const movementKeys = useRef(new Set<string>())
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

    // Handle pointer lock
    const handlePointerLockChange = () => {
      setPointerLocked(document.pointerLockElement === document.body)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!pointerLocked) return

      const movementX = e.movementX || 0
      const movementY = e.movementY || 0

      // Convert mouse movement to radians for consistent threshold checking
      // movementX controls yaw (left/right)
      const yaw = movementX * MOUSE_SENSITIVITY
      // movementY controls pitch (up/down)
      const pitch = movementY * MOUSE_SENSITIVITY

      // Only update camera rotation if movement exceeds minimum angle
      if (exceedsLookThreshold(yaw) || exceedsLookThreshold(pitch)) {
        updateCameraRotation(yaw, pitch)
      }
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

    const updateMovement = () => {
      const keys = movementKeys.current
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
        const length = Math.sqrt(
          movement.x * movement.x + movement.z * movement.z
        )
        movement.x /= length
        movement.z /= length
      }
    }

    // Handle pointer lock
    const handleCanvasClick = () => {
      if (!pointerLocked) {
        document.body.requestPointerLock()
      }
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    document.body.addEventListener('click', handleCanvasClick)

    return () => {
      leftJoystick.destroy()
      rightJoystick.destroy()
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.body.removeEventListener('click', handleCanvasClick)
      movementKeys.current.clear()
      // Reset movement state on cleanup
      localPlayerState.controls.move.forward = false
      localPlayerState.controls.move.backward = false
      localPlayerState.controls.move.left = false
      localPlayerState.controls.move.right = false
    }
  }, [pointerLocked, camera])

  return (
    <Html fullscreen>
      <div ref={leftJoystickRef} className={styles.joystick} />
      <div ref={rightJoystickRef} className={styles.joystick} />
    </Html>
  )
}
