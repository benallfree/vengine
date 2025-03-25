import { Camera } from '@react-three/fiber'
import { Euler, Vector3 } from 'three'
import { FPS_OFFSET, THIRD_PERSON_OFFSET } from './constants'
import { CameraMode, localPlayerState } from './state'

const CAMERA_TRANSITION_SPEED = 5 // units per second
const BASE_MOVEMENT_SPEED = 5 // units per second

// Temporary vectors for calculations
const currentOffset = new Vector3()
const targetOffset = new Vector3()
const lerpedOffset = new Vector3()
const moveDirection = new Vector3()
const playerRotation = new Euler()

export const localPlayerActions = {
  calculateMovement: (camera: Camera, delta: number) => {
    // Copy camera position to player state
    localPlayerState.position.copy(camera.position)

    // Copy camera rotation to player state
    localPlayerState.rotation.copy(camera.rotation)
  },

  toggleCameraMode: () => {
    const nextMode =
      localPlayerState.camera.mode === CameraMode.FPS
        ? CameraMode.THIRD_PERSON
        : CameraMode.FPS

    localPlayerState.camera.transitioning = true
    localPlayerState.camera.targetMode = nextMode
  },

  updateCameraTransition: (delta: number) => {
    if (
      !localPlayerState.camera.transitioning ||
      !localPlayerState.camera.targetMode
    )
      return

    // Get current and target offsets based on modes
    currentOffset.copy(
      localPlayerState.camera.mode === CameraMode.FPS
        ? FPS_OFFSET
        : THIRD_PERSON_OFFSET
    )

    targetOffset.copy(
      localPlayerState.camera.targetMode === CameraMode.FPS
        ? FPS_OFFSET
        : THIRD_PERSON_OFFSET
    )

    // Calculate lerp factor based on speed and delta time
    const lerpFactor = Math.min(CAMERA_TRANSITION_SPEED * delta, 1)

    // Lerp between current and target offsets
    lerpedOffset.lerpVectors(currentOffset, targetOffset, lerpFactor)

    // Update the current offset in state
    localPlayerState.camera.currentOffset.x = lerpedOffset.x
    localPlayerState.camera.currentOffset.y = lerpedOffset.y
    localPlayerState.camera.currentOffset.z = lerpedOffset.z

    // Check if we're close enough to complete the transition
    if (lerpedOffset.distanceTo(targetOffset) < 0.01) {
      const targetMode = localPlayerState.camera.targetMode
      localPlayerState.camera.mode = targetMode
      localPlayerState.camera.transitioning = false
      localPlayerState.camera.targetMode = undefined
      localPlayerState.camera.currentOffset.x = targetOffset.x
      localPlayerState.camera.currentOffset.y = targetOffset.y
      localPlayerState.camera.currentOffset.z = targetOffset.z
    }
  },
} as const
