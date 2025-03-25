import { Euler, Vector3 } from 'three'
import { proxy, ref } from 'valtio'

export const CameraMode = {
  FPS: 'fps',
  THIRD_PERSON: 'third-person',
} as const

export type CameraMode = (typeof CameraMode)[keyof typeof CameraMode]

interface LocalPlayerState {
  id: string | null
  position: Vector3
  rotation: Euler
  camera: {
    mode: CameraMode
    targetMode?: CameraMode
    transitioning: boolean
    currentOffset: Vector3
  }
}

export const localPlayerState = proxy<LocalPlayerState>({
  id: null,
  position: ref(new Vector3(0, 0, 0)),
  rotation: ref(new Euler(0, 0, 0)),
  camera: {
    mode: CameraMode.FPS,
    transitioning: false,
    currentOffset: ref(new Vector3(0, 2, -5)), // Initial third-person offset
  },
})
