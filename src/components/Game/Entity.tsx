import { useFrame } from '@react-three/fiber'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Box3, Euler, Object3D, Vector3 } from 'three'
import { useCollisionRegistration } from './Physics/useCollisionSystem'

// Reusable vectors to avoid garbage collection
const UP = new Vector3(0, 1, 0)
const FORWARD = new Vector3(0, 0, -1)
const RIGHT = new Vector3(1, 0, 0)
const tempVec = new Vector3()
const tempTarget = new Vector3()
const tempBox = new Box3()
const tempBoxOther = new Box3()
const tempBoxWorld = new Box3()
const tempBoxOtherWorld = new Box3()

export interface EntityState {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}

export interface Entity {
  id: number
  isReady: boolean
  position: Vector3
  rotation: Euler
  // Surface the Object3D for systems that need it (like physics)
  getObject3D: () => Object3D
  // Directional vectors
  up: Vector3
  forward: Vector3
  right: Vector3
  // Bottom point of the entity in world space
  bottom: Vector3
  // Look at a target position
  lookAt: (target: Vector3 | Entity) => void
  // Place this entity aligned with another's bottom and centered within its bounds
  placeWith: (other: Entity) => void
  // Move this entity away from another entity in its forward direction until their bounding boxes don't intersect
  separateFrom: (other: Entity, padding?: number) => void
  // Place the entity on the ground (Y=0) based on its current orientation and bounding box
  setOnGround: () => void
}

export interface EntityProps {
  id?: string
  getState?: () => EntityState
  onCollision?: (other: Entity) => void
  children?: React.ReactNode
}

// We expose Entity as the handle type too
export type EntityHandle = Entity

function useTrackableRef<T extends Entity>(initialValue: T) {
  const ref = useRef<T>(initialValue)
  useEffect(() => {
    if (!ref.current?.id) return
    console.log(`**Entity <${ref.current.id}> created`)
  }, [ref.current?.id])
  return ref
}

export const Entity = forwardRef<EntityHandle, EntityProps>(
  ({ id = 'unknown', getState, onCollision, children }, ref) => {
    const objectRef = useRef<Object3D>(null!)
    const selfRef = useTrackableRef<Entity>(null!)

    // Sync with state each frame if getState is provided
    useFrame(() => {
      if (!getState) return
      const state = getState()

      objectRef.current.position.set(
        state.position.x,
        state.position.y,
        state.position.z
      )

      objectRef.current.rotation.set(
        state.rotation.x,
        state.rotation.y,
        state.rotation.z
      )
      selfRef.current.isReady = true
    })

    // Create and expose our entity interface through the component's ref
    useImperativeHandle(ref, () => {
      // Create the entity interface
      const entity: Entity = {
        get id() {
          return entity.getObject3D().id
        },
        isReady: false,
        position: objectRef.current.position,
        rotation: objectRef.current.rotation,
        getObject3D: () => objectRef.current,
        // Computed directional vectors that update based on rotation
        get up() {
          return UP.clone().applyEuler(objectRef.current.rotation)
        },
        get forward() {
          return FORWARD.clone().applyEuler(objectRef.current.rotation)
        },
        get right() {
          return RIGHT.clone().applyEuler(objectRef.current.rotation)
        },
        lookAt: (target: Vector3 | Entity) => {
          // Handle different target types
          if ('position' in target && target.position instanceof Vector3) {
            tempTarget.copy(target.position)
          } else if (target instanceof Vector3) {
            tempTarget.copy(target)
          } else {
            console.error('Invalid target type passed to lookAt')
            return
          }

          // Point the object's -Z (forward) at the target
          objectRef.current.lookAt(tempTarget)
        },
        get bottom() {
          // Get world-space bounding box
          tempBox.setFromObject(objectRef.current)
          tempBoxWorld.copy(tempBox).applyMatrix4(objectRef.current.matrixWorld)
          return new Vector3(
            (tempBoxWorld.min.x + tempBoxWorld.max.x) / 2, // center X
            tempBoxWorld.min.y, // bottom Y
            (tempBoxWorld.min.z + tempBoxWorld.max.z) / 2 // center Z
          )
        },
        setOnGround: () => {
          // Get world-space bounding box
          tempBox.setFromObject(objectRef.current)
          tempBoxWorld.copy(tempBox).applyMatrix4(objectRef.current.matrixWorld)

          // Calculate current bottom Y position
          const currentBottomY = tempBoxWorld.min.y

          // Move the entity down by the current bottom Y position
          objectRef.current.position.y -= currentBottomY
        },
        placeWith: (other: Entity) => {
          // Get world-space bounding boxes for both entities
          tempBox.setFromObject(objectRef.current)
          tempBoxWorld.copy(tempBox).applyMatrix4(objectRef.current.matrixWorld)

          tempBoxOther.setFromObject(other.getObject3D())
          tempBoxOtherWorld
            .copy(tempBoxOther)
            .applyMatrix4(other.getObject3D().matrixWorld)

          // Calculate dimensions of both boxes
          const mySize = tempBoxWorld.getSize(tempVec)

          // Calculate target position that centers our box within other's box
          const targetX =
            (tempBoxOtherWorld.min.x + tempBoxOtherWorld.max.x) / 2
          const targetY = tempBoxOtherWorld.min.y + mySize.y / 2 // Place our bottom at their bottom
          const targetZ =
            (tempBoxOtherWorld.min.z + tempBoxOtherWorld.max.z) / 2

          // Set our position
          objectRef.current.position.set(targetX, targetY, targetZ)

          // Match rotation to face same direction
          objectRef.current.rotation.copy(other.rotation)
        },
        separateFrom: (other: Entity, padding = 0.1) => {
          // Get world-space bounding boxes
          tempBox.setFromObject(objectRef.current)
          tempBoxWorld.copy(tempBox).applyMatrix4(objectRef.current.matrixWorld)

          tempBoxOther.setFromObject(other.getObject3D())
          tempBoxOtherWorld
            .copy(tempBoxOther)
            .applyMatrix4(other.getObject3D().matrixWorld)

          // Early return if boxes don't intersect
          if (!tempBoxWorld.intersectsBox(tempBoxOtherWorld)) return

          // Get movement direction (forward vector)
          const moveDir = entity.forward

          // Get centers of both boxes
          const myCenter = tempBoxWorld.getCenter(tempVec)
          const otherCenter = tempBoxOtherWorld.getCenter(tempTarget)

          // Project the center-to-center vector onto our forward direction
          const centerDiff = tempVec.subVectors(myCenter, otherCenter)
          const forwardDist = centerDiff.dot(moveDir)

          // If we're behind the other object (relative to our forward direction),
          // we need to move forward. Otherwise, we're in front and should stay put.
          if (forwardDist < 0) {
            // Calculate how far forward we need to move
            // Use the larger of: padding, or distance to clear the intersection
            const moveDistance = Math.max(
              padding,
              -forwardDist +
                Math.max(
                  tempBoxWorld.min.distanceTo(tempBoxOtherWorld.max),
                  tempBoxWorld.max.distanceTo(tempBoxOtherWorld.min)
                ) /
                  2
            )

            objectRef.current.position.addScaledVector(moveDir, moveDistance)
          }
        },
      }

      // Store in our ref for collision registration
      selfRef.current = entity
      return entity
    }, [])

    // Register for collisions using our self ref
    if (onCollision) {
      useCollisionRegistration(selfRef, onCollision)
    }

    return <mesh ref={objectRef}>{children}</mesh>
  }
)
