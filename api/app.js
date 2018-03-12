'use strict'

const express = require('express')

const routes = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', routes)

app.use((req, res, next) => {
  console.log('404:', req.originalUrl)
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  let code = +err.code || 500
  if (code > 599) code = 500

  if (code >= 500) 
    console.error(err)
  else 
    console.warn(err)

  res.status(code)
  res.end()
})

module.exports = app