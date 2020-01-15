const express = require('express')
const cors = require('cors')
const db = require('../data/db')
const apiRouter = require('./api')
const server = express()

module.exports = server

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => res.send(`<h1>Welcome to Node-API2</h1>`))

server.use('/api', apiRouter)