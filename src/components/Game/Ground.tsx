import { type FC } from 'react'

const createGround = () => {
  const Ground: FC = () => {
    return (
      <>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>

        <gridHelper args={[50, 50, '#666666', '#444444']} />
      </>
    )
  }

  return Ground
}

export const Ground = createGround()
