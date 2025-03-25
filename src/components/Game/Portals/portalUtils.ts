import { Euler, Vector3 } from 'three'
import { EntityState } from '../Entity'

// Default spawn point if not entering through a portal
export const DEFAULT_SPAWN = {
  position: new Vector3(0, 1, 0),
  rotation: new Euler(0, 0, 0),
} as const

export const ENTER_PORTAL = {
  position: new Vector3(-20, 2, -30),
  rotation: new Euler(0, 0, 0),
} as const

export const EXIT_PORTAL = {
  position: new Vector3(20, 15, -30),
  rotation: new Euler(0, 0, 0),
} as const

// Calculate spawn point in front of portal
export const calculatePortalSpawn = (
  portalPosition: Vector3,
  portalRotation: Euler
) => {
  // Spawn 3 units in front of portal (negative Z is forward in our coordinate system)
  const SPAWN_DISTANCE = 3

  // Calculate position offset based on portal's rotation
  const spawnX = portalPosition.x - Math.sin(portalRotation.y) * SPAWN_DISTANCE
  const spawnZ = portalPosition.z - Math.cos(portalRotation.y) * SPAWN_DISTANCE

  return {
    position: new Vector3(spawnX, portalPosition.y, spawnZ),
    rotation: new Euler(
      portalRotation.x,
      portalRotation.y + Math.PI,
      portalRotation.z
    ),
  } as const
}

// Parse portal configuration from URL parameters
export const getPortalConfigFromUrl = (urlParams: URLSearchParams) => {
  const speedX = urlParams.get('speed_x')
  const speedY = urlParams.get('speed_y')
  const speedZ = urlParams.get('speed_z')
  const rotationX = urlParams.get('rotation_x')
  const rotationY = urlParams.get('rotation_y')
  const rotationZ = urlParams.get('rotation_z')

  return {
    position:
      speedX && speedY && speedZ
        ? new Vector3(
            parseFloat(speedX),
            parseFloat(speedY),
            parseFloat(speedZ)
          )
        : EXIT_PORTAL.position,
    rotation:
      rotationX && rotationY && rotationZ
        ? new Euler(
            parseFloat(rotationX),
            parseFloat(rotationY),
            parseFloat(rotationZ)
          )
        : EXIT_PORTAL.rotation,
  } as const
}

// Get portal state getters
export const getEnterPortalState = (): EntityState => ({
  position: {
    x: ENTER_PORTAL.position.x,
    y: ENTER_PORTAL.position.y,
    z: ENTER_PORTAL.position.z,
  },
  rotation: {
    x: ENTER_PORTAL.rotation.x,
    y: ENTER_PORTAL.rotation.y,
    z: ENTER_PORTAL.rotation.z,
  },
})

export const getExitPortalState = (): EntityState => ({
  position: {
    x: EXIT_PORTAL.position.x,
    y: EXIT_PORTAL.position.y,
    z: EXIT_PORTAL.position.z,
  },
  rotation: {
    x: EXIT_PORTAL.rotation.x,
    y: EXIT_PORTAL.rotation.y,
    z: EXIT_PORTAL.rotation.z,
  },
})
