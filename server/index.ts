import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')))
}

// Store connected players
const players = new Map()

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id)
  players.set(socket.id, {
    id: socket.id,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  })

  // Broadcast updated player count
  io.emit('world:stats', { playerCount: players.size })

  socket.on('player:move', ({ x, z }) => {
    const player = players.get(socket.id)
    if (!player) return

    player.position.x += x
    player.position.z += z

    // Broadcast player position to all other players
    socket.broadcast.emit('player:moved', {
      id: socket.id,
      position: player.position,
    })
  })

  socket.on('player:look', ({ x, y }) => {
    const player = players.get(socket.id)
    if (!player) return

    player.rotation.x = x
    player.rotation.y = y

    // Broadcast player rotation to all other players
    socket.broadcast.emit('player:looked', {
      id: socket.id,
      rotation: player.rotation,
    })
  })

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id)
    players.delete(socket.id)
    io.emit('world:stats', { playerCount: players.size })
    io.emit('player:left', { id: socket.id })
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
