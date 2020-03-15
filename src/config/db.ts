// const mongoose = require('mongoose')

import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI
      ? process.env.MONGO_URI
      : 'mongodb://localhost:27017/expense-tracker-mern'

    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold)

    return conn
  } catch (err) {
    console.log(`Error: ${err.message}`.red)
    process.exit(1)
  }
}
