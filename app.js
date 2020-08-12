const express = require('express')
const app = express();

const http = require('http')
const server = http.createServer(app)

const socketIo = require('socket.io')

const io = socketIo.listen(server)

server.listen(3000, () => {
    console.log('deu')
})

app.use(express.static(__dirname + '/public'))

const history = []

io.on('connection', (socket) => {
    console.log('nova conexão')

    history.forEach(line => {
        //manda só pra essa conexão
        socket.emit('draw', line)
    })

    socket.on('draw', (line) => {
        history.push(line)
        // manda pra todos
        io.emit('draw', line)
    })
})