import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SPHERE_RADIUS = 2
const ROTATION_SPEED = 0.001

export const createSphereTexture = () => {
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
  context.fillText('VENGINE', canvas.width / 2, canvas.height / 2)

  return new THREE.CanvasTexture(canvas)
}

export const Sphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const texture = createSphereTexture()
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
    <mesh ref={sphereRef} position={[0, 2, 0]} castShadow>
      <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
      <meshStandardMaterial />
    </mesh>
  )
}
