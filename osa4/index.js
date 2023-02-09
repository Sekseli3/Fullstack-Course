//require('dotenv').config()
//const mongoose = require('mongoose')
const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')
const server = http.createServer(app)



server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})