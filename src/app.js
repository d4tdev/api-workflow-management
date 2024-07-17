const express = require('express')
const { connectDB } = require('./config/mongodb')
const { env } = require('./config/environment')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const corsOptions = require('./config/cors')
const routes = require('./routes')

connectDB()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

routes(app)

// handling error
app.use((req, res, next) => {
   const error = new Error('Not Found')
   error.statusCode = 404
   next(error)
})
app.use((error, req, res, next) => {
   const status = error.statusCode || 500
   return res.status(status).json({
      status: 'error',
      code: status,
      message: error.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : '',
   })
})

module.exports = app
