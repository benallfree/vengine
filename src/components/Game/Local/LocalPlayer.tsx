import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, Vector3 } from 'three'
import { useSnapshot } from 'valtio'
import { BASE_MOVEMENT_SPEED, Player } from '../Player'
import { localPlayerActions } from './actions'
import { THIRD_PERSON_DISTANCE, THIRD_PERSON_HEIGHT } from './constants'
import { InputDevices } from './InputDevices'
import { CameraMode, localPlayerState } from './state'

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

    if (snap.camera.mode === CameraMode.THIRD_PERSON) {
      // In third person, player rotation follows camera's Y rotation
      playerRef.current.rotation.y = camera.rotation.y
    } else {
      // In FPS mode, player fully matches camera rotation
      playerRef.current.quaternion.copy(camera.quaternion)
      // Reset X and Z rotation to keep player upright
      playerRef.current.rotation.x = 0
      playerRef.current.rotation.z = 0
    }

    // Update camera transition and position
    localPlayerActions.updateCameraTransition(delta)

    if (snap.camera.mode === CameraMode.THIRD_PERSON) {
      // Create offset vector pointing backward
      const offset = new Vector3(0, THIRD_PERSON_HEIGHT, THIRD_PERSON_DISTANCE)

      // Rotate offset based on player's Y rotation only
      offset.applyAxisAngle(new Vector3(0, 1, 0), playerRef.current.rotation.y)

      // Position camera behind player
      camera.position.copy(playerRef.current.position).add(offset)

      // Make camera look at player
      camera.lookAt(playerRef.current.position)
    } else {
      // Get player's current position
      targetPosition.copy(playerRef.current.position)

      // For FPS mode, just add the offset directly
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
