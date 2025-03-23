import { useSnapshot } from 'valtio'
import { state } from '../../App'
import * as styles from './styles.css'

export const Splash = () => {
  const snap = useSnapshot(state)

  const handlePlay = () => {
    if (!snap.connected) return
    state.inGame = true
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vibe Portal</h1>

      <div className={styles.status}>
        <div className={styles.indicator(snap.connected)} />
        <span>{snap.connected ? 'Connected' : 'Connecting...'}</span>
      </div>

      <div className={styles.stats}>
        <span>Players Online: {snap.playerCount}</span>
      </div>

      <button
        className={styles.playButton(snap.connected)}
        onClick={handlePlay}
        disabled={!snap.connected}
      >
        Play
      </button>

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
