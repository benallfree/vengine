import { Canvas } from '@react-three/fiber'
import { World } from './World'
import { Controls } from './Controls'
import { HUD } from './HUD'
import * as styles from './styles.css'

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
      >
        <World />
      </Canvas>
      <Controls />
      <HUD />
    </div>
  )
}
