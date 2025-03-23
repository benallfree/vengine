import { forwardRef } from 'react'
import { Mesh } from 'three'

interface PlayerProps {
  position?: [number, number, number]
  color?: string
}

export const Player = forwardRef<Mesh, PlayerProps>(
  ({ position = [0, 1, 0], color = '#ff0000' }, ref) => {
    return (
      <mesh ref={ref} position={position}>
        <capsuleGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }
)
