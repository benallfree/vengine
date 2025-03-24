import { useSnapshot } from 'valtio'
import { Game } from './components/Game'
import { gameState } from './components/Game/state'
import { Network } from './components/Network'
import { Splash } from './components/Splash'

const App = () => {
  const snap = useSnapshot(gameState)

  return (
    <>
      <Network />
      {snap.inGame ? <Game /> : <Splash />}
    </>
  )
}

export default App
