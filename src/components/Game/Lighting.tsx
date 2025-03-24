import { type FC } from 'react'

const createLighting = () => {
  const Lighting: FC = () => {
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[10, 0, 0]} intensity={0.5} />
        <pointLight position={[-10, 0, 0]} intensity={0.5} />
      </>
    )
  }

  return Lighting
}

export const Lighting = createLighting()
