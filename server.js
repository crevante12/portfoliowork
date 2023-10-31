const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const cors = require('cors') 

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
mongoose.connect(
  'mongodb://localhost:27017/funkoDB',
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api',expressjwt({secret: process.env.SECRET, algorithms:['HS256']}))
app.use('/api/funko', require('./routes/funkoRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "Unauthorized error"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(6000, () => {
  console.log(`Server is running on local port 6000`)
})