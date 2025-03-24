import { EventData, JoystickOutputData } from 'nipplejs'
import { localPlayerState } from '../../state'
import { Joystick } from './Joystick'

const MOVEMENT_THRESHOLD = 0.1

const createMovementHandler =
  () => (_: EventData, data: JoystickOutputData) => {
    const force = Math.min(data.force, 1)
    if (force <= MOVEMENT_THRESHOLD) {
      localPlayerState.controls.move = {
        x: 0,
        z: 0,
      }
      return
    }

    const angle = data.angle.radian % (2 * Math.PI)
    const x = Math.cos(angle) * force
    const z = Math.sin(angle) * force

    localPlayerState.controls.move = {
      x: x, // Right is positive x in our coordinate system
      z: -z, // Forward is negative z in our coordinate system
    }
  }

export const MoveStick = () => {
  const handleMove = createMovementHandler()

  const handleMoveEnd = () => {
    localPlayerState.controls.move = {
      x: 0,
      z: 0,
    }
  }

  return <Joystick position="left" onMove={handleMove} onEnd={handleMoveEnd} />
}
