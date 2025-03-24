import { useSnapshot } from 'valtio'
import * as styles from './HUD.css'
import { gameState } from './state'

export const HUD = () => {
  const snap = useSnapshot(gameState)

  return (
    <div className={styles.hud}>
      <div className={styles.playerCount}>Players: {snap.playerCount}</div>
      <a
        href="https://portal.pieter.com"
        className={styles.portalButton}
        target="_blank"
        rel="noopener noreferrer"
      >
        Next Game →
      </a>
    </div>
  )
}
