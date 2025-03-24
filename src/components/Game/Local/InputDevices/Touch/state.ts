import { JoystickOutputData } from 'nipplejs'
import { proxy } from 'valtio'

type TouchState = {
  angle: JoystickOutputData['angle'] | null
  force: number | null
}

export const touchState = proxy<TouchState>({
  angle: null,
  force: null,
})
