import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import { useEffect } from 'react'
import { Box3 } from 'three'
import { Entity } from '../Entity'
import { collisionActions, collisionState } from './collisionState'
import { getObjectIds } from './objectId'

// Temporary boxes for collision checks to avoid allocations
const box1 = new Box3()
const box2 = new Box3()

export const useCollisionSystem = () => {
  useFrame(() => {
    const { collidables } = collisionState

    // Early return if not enough collidables for collision
    if (collidables.length < 2) return

    for (let i = 0; i < collidables.length; i++) {
      const a = collidables[i]
      if (!a.ref.current) continue
      if (!a.ref.current.isReady) continue

      const entityA = a.ref.current

      box1.setFromObject(entityA.getObject3D())

      for (let j = i + 1; j < collidables.length; j++) {
        const b = collidables[j]
        if (!b.ref.current) continue
        if (!b.ref.current.isReady) continue
        const entityB = b.ref.current

        box2.setFromObject(entityB.getObject3D())

        if (box1.intersectsBox(box2)) {
          console.log(`Entity A: ${entityA.id}`, entityA.position)
          console.log(`Entity B: ${entityB.id}`, entityB.position)
          console.log('Collided')
          a.onCollide?.(entityB)
          b.onCollide?.(entityA)
        }
      }
    }
  })
}

export const useCollisionRegistration = (
  ref: RefObject<Entity>,
  onCollide: (other: Entity) => void
) => {
  useEffect(() => {
    if (!ref.current) return
    const key = getObjectIds(ref.current, onCollide)
    console.log(`useCollisionRegistration(${key})`)

    return collisionActions.register({
      ref,
      onCollide,
    })
  }, [ref.current])
}
