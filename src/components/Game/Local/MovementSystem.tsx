import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { useSnapshot } from 'valtio'
import { localPlayerActions } from './actions'
import { CameraMode, localPlayerState } from './state'

// Reusable vectors to avoid garbage collection
const tempVec = new Vector3()
const tempCameraOffset = new Vector3()

export const MovementSystem = () => {
  const { camera } = useThree()
  const snap = useSnapshot(localPlayerState)
  const playerRef = useRef<Vector3>(new Vector3())

  useFrame((_, delta) => {
    // Calculate movement based on input state
    const movement = localPlayerActions.calculateMovement(camera, delta)

    // Update player position
    playerRef.current.copy(movement)
    localPlayerState.position.x += movement.x
    localPlayerState.position.y += movement.y
    localPlayerState.position.z += movement.z

    // Update camera position based on player position and camera mode
    tempCameraOffset.set(
      snap.camera.currentOffset.x,
      snap.camera.currentOffset.y,
      snap.camera.currentOffset.z
    )

    if (snap.camera.mode === CameraMode.THIRD_PERSON) {
      // In third-person, rotate the offset based on camera rotation
      tempCameraOffset.applyEuler(camera.rotation)
    }

    // Set camera position relative to player
    camera.position.set(
      localPlayerState.position.x + tempCameraOffset.x,
      localPlayerState.position.y + tempCameraOffset.y,
      localPlayerState.position.z + tempCameraOffset.z
    )

    // Update camera transition if needed
    localPlayerActions.updateCameraTransition(delta)
  })

  return null
}
