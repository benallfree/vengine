import { useSnapshot } from 'valtio'
import { LocalPlayer } from './Local/LocalPlayer'
import { Sphere } from './Sphere'
import { gameState } from './state'

export const World = () => {
  const snap = useSnapshot(gameState)

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

      <Sphere />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.4} />
      </mesh>

      <gridHelper args={[50, 50, '#666666', '#444444']} />

      <LocalPlayer />
    </>
  )
}
