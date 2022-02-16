const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(error => {
    error('Error connecting to MongDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app