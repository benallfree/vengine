import { Vector3 } from 'three'
import { PLAYER_HEIGHT } from '../Player'

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
