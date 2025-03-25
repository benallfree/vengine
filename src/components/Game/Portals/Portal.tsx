import { forwardRef } from 'react'
import { Entity, EntityHandle, EntityProps, EntityState } from '../Entity'
import { PortalLabel } from './PortalLabel'
import { PortalParticles } from './PortalParticles'

export interface PortalProps extends EntityProps {
  getState: () => EntityState
  color?: string
  label?: string
  diameter?: number
  onEnter?: () => void
}

export const Portal = forwardRef<EntityHandle, PortalProps>(
  (
    {
      getState,
      color = '#ffffff',
      label,
      diameter = 5,
      onEnter,
      id = 'portal',
    },
    ref
  ) => {
    // Calculate scale factor based on desired diameter vs original size (30)
    const scale = diameter / 30 // Original portal was 30 units diameter

    return (
      <Entity
        id={id}
        ref={ref}
        getState={getState}
        onCollision={() => onEnter?.()}
      >
        <group scale={scale}>
          {/* Main portal ring */}
          <mesh>
            <torusGeometry args={[15, 2, 16, 100]} />
            <meshPhongMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Inner portal surface */}
          <mesh>
            <circleGeometry args={[13, 32]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.5}
              side={2}
            />
          </mesh>

          {/* Particle system */}
          <PortalParticles color={color} radius={15} />

          {/* Optional label */}
          {label && <PortalLabel text={label} color={color} radius={15} />}
        </group>
      </Entity>
    )
  }
)
