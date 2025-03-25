import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { HUD } from './HUD'
import { Joysticks } from './Local/InputDevices/Touch/Joysticks'
import { IsTouch } from './Utils/DeviceDetection'
import { World } from './World'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
]

export const Game = () => {
  console.log(`Game render`)
  return (
    <>
      <KeyboardControls map={keyboardMap}>
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
            // e.stopPropagation()
            // const canvas = e.target as HTMLCanvasElement
            // if (!document.pointerLockElement && canvas) {
            //   canvas.requestPointerLock()
            // }
          }}
        >
          <World />
        </Canvas>
      </KeyboardControls>
      <HUD />
      <IsTouch>
        <Joysticks />
      </IsTouch>
    </>
  )
}
