require('dotenv').config()
const express=  require('express')
const cors = require('cors')
const app = express()
const imageRouter= require('./controller/imageRouter')
app.use(express.json())
app.use(cors())
app.use('/images',imageRouter)
module.exports = app
