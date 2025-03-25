import { useEffect, useRef } from 'react'
import { Entity } from './Entity'
import { Ground } from './Ground'
import { Lighting } from './Lighting'
import { InputDevices } from './Local/InputDevices'
import { LocalPlayer, LocalPlayerHandle } from './Local/LocalPlayer'
import { MovementSystem } from './Local/MovementSystem'
import { localPlayerState } from './Local/state'
import { CollisionSystem } from './Physics/CollisionSystem'
import { PortalSystem } from './Portals/PortalSystem'
import {
  DEFAULT_SPAWN,
  calculatePortalSpawn,
  getEnterPortalState,
  getExitPortalState,
  getPortalConfigFromUrl,
} from './Portals/portalUtils'
import { Sky } from './Sky'
import { Sphere } from './Sphere'

export const World = () => {
  const playerRef = useRef<LocalPlayerHandle>(null!)
  const urlParams = new URLSearchParams(window.location.search)
  const isPortalEntry = urlParams.get('portal') === 'true'

  // Get portal configuration from URL parameters
  const portalConfig = getPortalConfigFromUrl(urlParams)

  const spawn = isPortalEntry
    ? calculatePortalSpawn(portalConfig.position, portalConfig.rotation)
    : DEFAULT_SPAWN

  // Initialize player state with spawn position
  useEffect(() => {
    localPlayerState.position.x = spawn.position.x
    localPlayerState.position.y = spawn.position.y
    localPlayerState.position.z = spawn.position.z
    localPlayerState.rotation.x = spawn.rotation.x
    localPlayerState.rotation.y = spawn.rotation.y
    localPlayerState.rotation.z = spawn.rotation.z
  }, [])

  const handlePortalsReady = (enterPortal: Entity, exitPortal: Entity) => {
    if (isPortalEntry && playerRef.current) {
      // First place the player with the portal
      playerRef.current.placeWith(enterPortal)
      // Then separate them to prevent immediate collision
      playerRef.current.separateFrom(enterPortal, 0.5) // Using slightly larger padding for safety
    }
  }

  return (
    <>
      <MovementSystem />
      <CollisionSystem />
      <InputDevices />
      <Sky />
      <Lighting />
      <Ground />
      <Sphere />
      <PortalSystem
        getEnterPortalState={getEnterPortalState}
        getExitPortalState={getExitPortalState}
        onPortalsReady={handlePortalsReady}
      />
      <LocalPlayer ref={playerRef} getState={() => localPlayerState} />
    </>
  )
}
