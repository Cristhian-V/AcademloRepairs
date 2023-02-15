require('dotenv').config()
require('./models/init.model')
const Server = require('./models/Server')

const server = new Server()

server.listen()