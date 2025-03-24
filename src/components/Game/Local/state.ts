import { proxy } from 'valtio'

export const CameraMode = {
  FPS: 'fps',
  THIRD_PERSON: 'third-person',
} as const

export type CameraMode = (typeof CameraMode)[keyof typeof CameraMode]

interface LocalPlayerState {
  id: string | null
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  camera: {
    mode: CameraMode
    targetMode?: CameraMode
    transitioning: boolean
    currentOffset: { x: number; y: number; z: number }
  }
  controls: {
    move: {
      x: number
      z: number
    }
    look: {
      yaw: number
      pitch: number
    }
  }
}

export const localPlayerState = proxy<LocalPlayerState>({
  id: null,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  camera: {
    mode: CameraMode.THIRD_PERSON,
    transitioning: false,
    currentOffset: { x: 0, y: 2, z: -5 }, // Initial third-person offset
  },
  controls: {
    move: {
      x: 0,
      z: 0,
    },
    look: {
      yaw: 0,
      pitch: 0,
    },
  },
})
