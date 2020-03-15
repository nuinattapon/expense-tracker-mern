// const path = require('path')
// const express = require('express')
// const dotenv = require('dotenv')
// const colors = require('colors')
// const morgan = require('morgan')
// const connectDB = require('./config/db')
import path from 'path'
import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { connectDB } from './config/db'
import { router as transactions } from './routes/transactions'

import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })
;(async () => {
  try {
    const conn = await connectDB()

    // const transactions = require('./routes/transactions')

    const app = express()
    app.disable('x-powered-by')
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

    app.listen(PORT, () => {
      console.log(
        colors.yellow.bold(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      )
    })
  } catch (error) {
    console.log(error)
  }
})()
