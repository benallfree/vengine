import { useSnapshot } from 'valtio'
import { Game } from './components/Game'
import { gameState } from './components/Game/state'
import { Network } from './components/Network'
import { Splash } from './components/Splash'
import { VibeJamLink } from './components/VibeJamLink'

const App = () => {
  const snap = useSnapshot(gameState)

  return (
    <>
      <Network />
      {snap.inGame ? <Game /> : <Splash />}
      <VibeJamLink />
    </>
  )
}

export default App
