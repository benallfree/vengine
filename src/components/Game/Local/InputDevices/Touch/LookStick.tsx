import { EventData, JoystickOutputData } from 'nipplejs'
import { localPlayerState } from '../../state'
import { Joystick } from './Joystick'

const LOOK_THRESHOLD = 0.1
const LOOK_SENSITIVITY = 0.002 // Matches mouse sensitivity

export const LookStick = () => {
  const handleLook = (_: EventData, data: JoystickOutputData) => {
    const force = Math.min(data.force, 1)
    if (force <= LOOK_THRESHOLD) {
      localPlayerState.controls.look = {
        yaw: 0,
        pitch: 0,
      }
      return
    }

    const angle = data.angle.radian % (2 * Math.PI)
    // Convert force and angle to normalized x/y coordinates
    const x = Math.cos(angle) * force * LOOK_SENSITIVITY
    const y = Math.sin(angle) * force * LOOK_SENSITIVITY

    localPlayerState.controls.look = {
      yaw: -x, // Negate x since right is positive in our coordinate system
      pitch: -y, // Negate y since up is negative in our coordinate system
    }
  }

  const handleLookEnd = () => {
    localPlayerState.controls.look = {
      yaw: 0,
      pitch: 0,
    }
  }

  return <Joystick position="right" onMove={handleLook} onEnd={handleLookEnd} />
}
