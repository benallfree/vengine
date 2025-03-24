import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { LocalPlayer } from './Local/LocalPlayer'
import { gameState } from './state'

const SPHERE_RADIUS = 2
const ROTATION_SPEED = 0.001

export const World = () => {
  const sphereRef = useRef<THREE.Mesh>(null)
  const snap = useSnapshot(gameState)

  useEffect(() => {
    // Create text texture for sphere
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    canvas.width = 512
    canvas.height = 512

    context.fillStyle = '#000000'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.font = 'bold 72px Arial'
    context.fillStyle = '#ffffff'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('VIBE PORTAL', canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    if (sphereRef.current) {
      sphereRef.current.material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.5,
        roughness: 0.5,
      })
    }
  }, [])

  useFrame((_, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += ROTATION_SPEED * delta * 60
    }
  })

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

      <mesh ref={sphereRef} position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
        <meshStandardMaterial />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.4} />
      </mesh>

      <gridHelper args={[50, 50, '#666666', '#444444']} />

      <LocalPlayer />
    </>
  )
}
