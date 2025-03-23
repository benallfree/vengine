import { gameState } from '@/store/gameState'
import { useSnapshot } from 'valtio'
import * as styles from './styles.css'

export const Splash = () => {
  const snap = useSnapshot(gameState)

  const handlePlay = () => {
    if (!snap.connected) return
    gameState.inGame = true
  }

  return (
    <div className={styles.container}>
      {snap.connected ? 'foo' : 'bar'}
      <h1 className={styles.title}>Vibe Portal</h1>

      <div className={styles.status}>
        <div className={styles.indicator({ connected: snap.connected })} />
        <span>{snap.connected ? 'Connected' : 'Connecting...'}</span>
      </div>

      <div className={styles.stats}>
        <span>Players Online: {snap.playerCount}</span>
      </div>

      <button
        className={styles.playButton({ connected: snap.connected })}
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
