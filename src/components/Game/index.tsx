import { Canvas } from '@react-three/fiber'
import { HUD } from './HUD'
import { Joysticks } from './Local/InputDevices/Touch/Joysticks'
import { IsTouch } from './Utils/DeviceDetection'
import { World } from './World'

export const Game = () => {
  console.log(`Game render`)
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 2, 5],
        }}
        onClick={(e) => {
          // Stop event from bubbling to parent div
          e.stopPropagation()
          const canvas = e.target as HTMLCanvasElement
          if (!document.pointerLockElement && canvas) {
            canvas.requestPointerLock()
          }
        }}
      >
        <World />
      </Canvas>
      <HUD />
      <IsTouch>
        <Joysticks />
      </IsTouch>
    </>
  )
}
