import { EventData, JoystickOutputData } from 'nipplejs'
import { Joystick } from './Joystick'
import { touchState } from './state'

const MOVEMENT_THRESHOLD = 0.1

const createMovementHandler =
  () => (_: EventData, data: JoystickOutputData) => {
    touchState.move.force = data.force
    touchState.move.angle = data.angle
  }

export const MoveStick = () => {
  const handleMove = createMovementHandler()

  const handleMoveEnd = () => {
    touchState.move.force = null
    touchState.move.angle = null
  }

  return <Joystick position="left" onMove={handleMove} onEnd={handleMoveEnd} />
}
