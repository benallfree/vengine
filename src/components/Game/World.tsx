import { Ground } from './Ground'
import { Lighting } from './Lighting'
import { LocalPlayer } from './Local/LocalPlayer'
import { Sphere } from './Sphere'

export const World = () => {
  return (
    <>
      <Lighting />
      <Ground />
      <Sphere />
      <LocalPlayer />
    </>
  )
}
