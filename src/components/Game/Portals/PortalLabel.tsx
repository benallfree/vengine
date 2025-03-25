import { useMemo } from 'react'
import * as THREE from 'three'

interface PortalLabelProps {
  text: string
  color: string
  radius: number
}

export const PortalLabel = ({ text, color, radius }: PortalLabelProps) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    canvas.width = 512
    canvas.height = 64

    context.fillStyle = color
    context.font = 'bold 32px Arial'
    context.textAlign = 'center'
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [text, color])

  // Make position and size proportional to radius
  const yOffset = radius * 1.33 // 20/15 ratio from original
  const width = radius * 2 // 30/15 ratio from original
  const height = radius * 0.333 // 5/15 ratio from original

  return (
    <mesh position={[0, yOffset, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={2} // DoubleSide
      />
    </mesh>
  )
}
