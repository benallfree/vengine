import { JoystickOutputData } from 'nipplejs'
import { proxy } from 'valtio'

type TouchState = {
  move: {
    angle: JoystickOutputData['angle'] | null
    force: JoystickOutputData['force'] | null
  }
  look: {
    angle: JoystickOutputData['angle'] | null
    force: JoystickOutputData['force'] | null
  }
}

export const touchState = proxy<TouchState>({
  move: {
    angle: null,
    force: null,
  },
  look: {
    angle: null,
    force: null,
  },
})
