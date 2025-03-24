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
      forward: boolean
      backward: boolean
      left: boolean
      right: boolean
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
      forward: false,
      backward: false,
      left: false,
      right: false,
    },
  },
})
