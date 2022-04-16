const http = require('http')
const serverHandler = require('../app')
const PORT = 3000

const  server = http.createServer(serverHandler)

server.listen(PORT)
console.log(`the server is runing on 127.0.0.1:${PORT}`)