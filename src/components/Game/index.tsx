import { Canvas } from '@react-three/fiber'
import * as styles from './Game.css'
import { HUD } from './HUD'
import { Controls } from './Local/Controls'
import { World } from './World'

export const Game = () => {
  return (
    <div className={styles.container}>
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
        <Controls />
      </Canvas>
      <HUD />
    </div>
  )
}
