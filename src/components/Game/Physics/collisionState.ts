import type { RefObject } from 'react'
import { proxy, ref as proxyRef, subscribe } from 'valtio'
import { proxyMap } from 'valtio/utils'
import type { Entity } from '../Entity'
import { getObjectIds } from './objectId'

interface Collidable {
  ref: RefObject<Entity>
  onCollide: (other: Entity) => void
}

interface CollisionState {
  collidables: Collidable[]
  collidablesByKey: Map<string, Collidable>
}

// console.log(`collisionState init`)
export const collisionState = proxy<CollisionState>({
  collidables: proxyRef([]),
  collidablesByKey: proxyMap<string, Collidable>(),
})

const dbg = (msg: string) => {
  console.log(
    msg,
    `keys: ${Array.from(collisionState.collidablesByKey.keys()).join(', ')}`,
    `size: ${collisionState.collidablesByKey.size}`,
    `length: ${collisionState.collidables.length}`
  )
}
subscribe(collisionState, () => {
  // dbg('collisionState update')
})

export const collisionActions = {
  register: (collidable: Collidable) => {
    const { ref, onCollide } = collidable

    const key = getObjectIds(ref, onCollide, collidable)

    // dbg(`register ${key}`)

    if (collisionState.collidablesByKey.has(key)) {
      throw new Error(`Collidable already registered: ${key}`)
    }

    const cleanup = () => {
      // dbg(`cleanup ${key}`)
      if (!collisionState.collidablesByKey.delete(key)) return

      collisionState.collidables = proxyRef(
        collisionState.collidables.filter((c) => {
          const arrayElemId = getObjectIds(c)
          const collidableId = getObjectIds(collidable)
          // console.log(
          //   `cleanup ${arrayElemId} ${collidableId}`,
          //   c !== collidable
          // )
          return c !== collidable
        })
      )
      // dbg(`after cleanup ${key} ${collisionState.collidables.length}`)
    }
    collisionState.collidablesByKey.set(key, collidable)
    collisionState.collidables.push(collidable)

    // dbg(`after register ${key}`)

    return cleanup
  },
}
