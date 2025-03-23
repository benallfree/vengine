import { useSnapshot } from 'valtio'
import { state } from '../../App'
import * as styles from './styles.css'

export const HUD = () => {
  const snap = useSnapshot(state)

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
