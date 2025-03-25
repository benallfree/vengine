import { useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { BASE_MOVEMENT_SPEED } from '../../../Player'

const DIAGONAL_MOVEMENT = 0.7071067811865476 // 1/√2, precalculated for performance

export const Keyboard = () => {
  const { camera } = useThree()
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useFrame((_, delta) => {
    // Get key states directly
    const forward = getKeys().forward
    const backward = getKeys().backward
    const left = getKeys().leftward
    const right = getKeys().rightward

    // Early return if no movement keys are pressed
    if (!forward && !backward && !left && !right) return

    // Calculate movement direction
    const x = (right ? 1 : 0) - (left ? 1 : 0)
    const z = (backward ? 1 : 0) - (forward ? 1 : 0)

    // Apply diagonal movement optimization
    const moveX = x * (x !== 0 && z !== 0 ? DIAGONAL_MOVEMENT : 1)
    const moveZ = z * (x !== 0 && z !== 0 ? DIAGONAL_MOVEMENT : 1)

    // Calculate movement based on camera orientation and delta time
    const speed = BASE_MOVEMENT_SPEED * delta
    const forwardDir = camera.getWorldDirection(new Vector3())
    forwardDir.y = 0 // Keep movement on horizontal plane
    forwardDir.normalize() // Re-normalize after zeroing Y

    const rightDir = new Vector3().crossVectors(
      forwardDir,
      new Vector3(0, 1, 0)
    )
    rightDir.y = 0 // Keep movement on horizontal plane
    rightDir.normalize() // Re-normalize after zeroing Y

    // Apply movement (negate moveZ since camera forward is negative Z)
    camera.position.addScaledVector(forwardDir, -moveZ * speed)
    camera.position.addScaledVector(rightDir, moveX * speed)
  })

  return null
}
