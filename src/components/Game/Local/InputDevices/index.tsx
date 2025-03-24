import { IsDesktop, IsTouch } from '../../Utils/DeviceDetection'
import { DesktopController } from './Desktop/DesktopController'
import { TouchController } from './Touch/TouchController'

export const InputDevices = () => {
  return (
    <>
      <IsTouch>
        <TouchController />
      </IsTouch>
      <IsDesktop>
        <DesktopController />
      </IsDesktop>
    </>
  )
}
