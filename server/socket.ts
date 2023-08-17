import http from 'http'
import { Server, Socket } from 'socket.io'

export default function startSocketServer() {
  const httpServer = http.createServer()
  const io = new Server(httpServer)

  io.on('connection', (socket: Socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })

    // Emit messages or perform other Socket.IO operations here
  })

  const PORT = process.env.PORT || 3000

  httpServer.listen(PORT, () => {
    console.log(`Socket.IO server listening on port ${PORT}`)
  })
}
