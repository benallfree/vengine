import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, Vector3 } from 'three'
import { useSnapshot } from 'valtio'
import { localPlayerState } from '../../store/gameState'
import { Player } from './Player'

const MOVEMENT_SPEED = 5 // units per second
const moveDirection = new Vector3()

export const LocalPlayer = () => {
  const playerRef = useRef<Mesh>(null)
  const { camera } = useThree()
  const snap = useSnapshot(localPlayerState)

  useFrame((_, delta) => {
    if (!playerRef.current) return

    // Handle movement
    moveDirection.set(0, 0, 0)

    if (snap.controls.move.forward) moveDirection.z += 1
    if (snap.controls.move.backward) moveDirection.z -= 1
    if (snap.controls.move.left) moveDirection.x -= 1
    if (snap.controls.move.right) moveDirection.x += 1

    // Normalize movement vector
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize()

      // Apply camera rotation to movement direction
      moveDirection.applyQuaternion(camera.quaternion)
      // Keep movement on the ground plane
      moveDirection.y = 0

      // Apply movement speed and delta time
      moveDirection.multiplyScalar(MOVEMENT_SPEED * delta)

      // Update position
      playerRef.current.position.add(moveDirection)
    }

    // Update rotation to match camera's Y rotation only
    playerRef.current.quaternion.copy(camera.quaternion)
    // Reset X and Z rotation to keep player upright
    playerRef.current.rotation.x = 0
    playerRef.current.rotation.z = 0
  })

  return <Player ref={playerRef} color="#00ff00" />
}
