import { useSnapshot } from 'valtio'
import { Game } from './components/Game'
import { Network } from './components/Network'
import { Splash } from './components/Splash'
import { gameState } from './store/gameState'

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
