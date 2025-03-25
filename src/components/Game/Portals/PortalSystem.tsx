import { useEffect, useRef } from 'react'
import { Entity, EntityState } from '../Entity'
import { Portal } from './Portal'

interface PortalSystemProps {
  getEnterPortalState: () => EntityState
  getExitPortalState: () => EntityState
  onPortalsReady?: (enterPortalRef: Entity, exitPortalRef: Entity) => void
}

// Portal colors
const ENTER_PORTAL_COLOR = '#ff0000'
const EXIT_PORTAL_COLOR = '#00ff00'

export const PortalSystem = ({
  getEnterPortalState,
  getExitPortalState,
  onPortalsReady: onPortalReady,
}: PortalSystemProps) => {
  const urlParams = new URLSearchParams(window.location.search)
  const isPortalEntry = urlParams.get('portal') === 'true'
  const hasRefUrl = urlParams.get('ref') !== null

  // Maintain refs to both portals
  const enterPortalRef = useRef<Entity>(null!)
  const exitPortalRef = useRef<Entity>(null!)

  // Notify parent when both portals are ready
  useEffect(() => {
    if (enterPortalRef.current && exitPortalRef.current && onPortalReady) {
      onPortalReady(enterPortalRef.current, exitPortalRef.current)
    }
  }, [onPortalReady])

  // Clear portal param after initial load
  useEffect(() => {
    if (isPortalEntry) {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('portal')
      window.history.replaceState({}, '', newUrl)
    }
  }, [isPortalEntry])

  const handleExitPortal = () => {
    // Create URL for portal.pieter.com
    const portalUrl = new URL('http://portal.pieter.com')

    // Add required parameters
    portalUrl.searchParams.set('portal', 'true')
    portalUrl.searchParams.set('ref', window.location.href)
    portalUrl.searchParams.set('speed', '5') // Default speed in m/s

    // Optional parameters - using current portal position/rotation for precise continuity
    const state = getEnterPortalState()

    portalUrl.searchParams.set('speed_x', state.position.x.toString())
    portalUrl.searchParams.set('speed_y', state.position.y.toString())
    portalUrl.searchParams.set('speed_z', state.position.z.toString())
    portalUrl.searchParams.set('rotation_x', state.rotation.x.toString())
    portalUrl.searchParams.set('rotation_y', state.rotation.y.toString())
    portalUrl.searchParams.set('rotation_z', state.rotation.z.toString())

    // Redirect to portal
    window.location.href = portalUrl.toString()
  }

  const handleEnterPortal = () => {
    // If we have a ref URL, navigate back to it
    const refUrl = urlParams.get('ref')
    if (refUrl) {
      window.location.href = refUrl
    } else {
      console.log('Exited through portal but no ref URL found')
    }
  }

  return (
    <>
      {hasRefUrl && (
        <Portal
          id="enter-portal"
          ref={enterPortalRef}
          getState={getEnterPortalState}
          color={ENTER_PORTAL_COLOR}
          onEnter={handleEnterPortal}
          label="Go back"
        />
      )}

      <Portal
        id="exit-portal"
        ref={exitPortalRef}
        getState={getExitPortalState}
        color={EXIT_PORTAL_COLOR}
        onEnter={handleExitPortal}
        label="Exit"
      />
    </>
  )
}
