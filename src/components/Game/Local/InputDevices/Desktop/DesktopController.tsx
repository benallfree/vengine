import { Keyboard } from './Keyboard'
import { Mouse } from './Mouse'

export const DesktopController = () => {
  console.log(`DesktopController rendered`)

  return (
    <>
      <Mouse />
      <Keyboard />
    </>
  )
}
