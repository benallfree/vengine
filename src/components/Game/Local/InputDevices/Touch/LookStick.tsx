import { EventData, JoystickOutputData } from 'nipplejs'
import { Joystick } from './Joystick'
import { touchState } from './state'

const LOOK_THRESHOLD = 0.1
const LOOK_SENSITIVITY = 0.002 // Matches mouse sensitivity

export const LookStick = () => {
  const handleLook = (_: EventData, data: JoystickOutputData) => {
    touchState.look.force = data.force
    touchState.look.angle = data.angle
  }

  const handleLookEnd = () => {
    touchState.look.force = null
    touchState.look.angle = null
  }

  return <Joystick position="right" onMove={handleLook} onEnd={handleLookEnd} />
}
