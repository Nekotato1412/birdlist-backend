require('dotenv').config()

const winston = require('winston')
const Express = require('express')
const App = Express()

const Mongoose = require('mongoose')
const { loggers } = require('winston')

const PORT = process.env.PORT
const URI = process.env.CONNECTION_URI

const LOGGER = winston.createLogger({
    level: 'info',
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
  })

// MongoDB(M)
Mongoose.connect(URI, { useNewUrlParser: true })
const db = Mongoose.connection

db.on('error', (err) => LOGGER.error(err))
db.once('open', () => LOGGER.info("Connected to Database."))

// Express(E)
App.use(Express.json())

const { accountRouter } = require('./routes/accounts')
const { loginRouter } = require('./routes/login')

App.use('/accounts', accountRouter)
App.use('/login', loginRouter)

App.get("/status", (req, res) => {
  res.status(200).json({ "online": true })
})

App.listen(PORT, () => {
    LOGGER.info(`Listening on port ${PORT}!`)
})