import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, Vector3 } from 'three'
import { useSnapshot } from 'valtio'
import { BASE_MOVEMENT_SPEED, Player, PLAYER_HEIGHT } from '../Player'
import { localPlayerActions } from './actions'
import { InputDevices } from './InputDevices'
import { localPlayerState } from './state'

// Camera positioning relative to player
const EYE_HEIGHT = PLAYER_HEIGHT * 0.85 // Approximately at eye level
export const THIRD_PERSON_DISTANCE = 5
export const THIRD_PERSON_HEIGHT = 2
export const THIRD_PERSON_OFFSET = new Vector3(
  0,
  THIRD_PERSON_HEIGHT,
  -THIRD_PERSON_DISTANCE
)
export const FPS_OFFSET = new Vector3(0, EYE_HEIGHT, 0)

// Temporary vector for calculations
const targetPosition = new Vector3()

export const LocalPlayer = () => {
  const playerRef = useRef<Mesh>(null)
  const { camera } = useThree()
  const snap = useSnapshot(localPlayerState)

  useFrame((_, delta) => {
    if (!playerRef.current) return

    // Calculate movement direction based on controls
    const moveDirection = localPlayerActions.calculateMovement(camera)

    // Apply movement speed and delta time
    moveDirection.multiplyScalar(BASE_MOVEMENT_SPEED * delta)

    // Update position
    playerRef.current.position.add(moveDirection)

    // Update rotation to match camera's Y rotation only
    playerRef.current.quaternion.copy(camera.quaternion)
    // Reset X and Z rotation to keep player upright
    playerRef.current.rotation.x = 0
    playerRef.current.rotation.z = 0

    // Update camera transition and position
    localPlayerActions.updateCameraTransition(delta)

    // Update camera position based on current offset
    if (playerRef.current) {
      // Get player's current position
      targetPosition.copy(playerRef.current.position)

      // Add the current camera offset
      targetPosition.x += snap.camera.currentOffset.x
      targetPosition.y += snap.camera.currentOffset.y
      targetPosition.z += snap.camera.currentOffset.z

      // Update camera position
      camera.position.copy(targetPosition)
    }
  })

  return (
    <>
      <InputDevices />
      <Player ref={playerRef} color="#00ff00" />
    </>
  )
}
