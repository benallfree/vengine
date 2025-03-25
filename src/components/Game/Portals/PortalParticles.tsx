import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface PortalParticlesProps {
  color: string
  count?: number
  radius?: number
}

export const PortalParticles = ({
  color,
  count = 1000,
  radius = 15,
}: PortalParticlesProps) => {
  const points = useRef<THREE.Points>(null!)

  // Create particles in a ring around the portal
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color3 = new THREE.Color(color)

    for (let i = 0; i < count * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2
      const spread = radius * 0.267
      const r = radius + (Math.random() - 0.5) * spread

      positions[i] = Math.cos(angle) * r
      positions[i + 1] = Math.sin(angle) * r
      positions[i + 2] = (Math.random() - 0.5) * spread

      colors[i] = color3.r * (0.8 + Math.random() * 0.2)
      colors[i + 1] = color3.g * (0.8 + Math.random() * 0.2)
      colors[i + 2] = color3.b * (0.8 + Math.random() * 0.2)
    }

    return [positions, colors]
  }, [count, radius, color])

  useFrame(() => {
    if (!points.current) return
    const positions = points.current.geometry.attributes.position
      .array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const amplitude = radius * 0.00333
      positions[i + 1] += amplitude * Math.sin(Date.now() * 0.001 + i)
    }

    points.current.geometry.attributes.position.needsUpdate = true
  })
  console.log('PortalParticles render')
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={radius * 0.0133}
        vertexColors
        transparent
        opacity={0.6}
      />
    </points>
  )
}
