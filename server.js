const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })
// process.env.NODE_ENV = 'production'
// process.env.PORT = 5000
// process.env.MONGO_URI =
//   'mongodb+srv://nui:Otpqgjw0JfpWdgFV@nattapon-cebnd.mongodb.net/test?retryWrites=true&w=majority'

// console.log(process.env.MONGO_URI)
connectDB()

const transactions = require('./routes/transactions')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/transactions', transactions)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
