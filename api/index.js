'use strict'

const app = require('./app')

const SHUTDOWN_DELAY_WHILE_LOG_WRITES_FINISH = 15

killProcessOn('uncaughtException')
killProcessOn('unhandledRejection')

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

const server = app.listen(8081, 'localhost', function() {
  console.log(`API listening at http://localhost:8081`)
})

function killProcessOn(eventName) {
  process.on(eventName, function(err) {
    console.error(err, eventName)
    crash()
  })
}

function crash() {
  console.log('Shuting down (crash)...')
  server.close(function() {
    console.log('http server closed gracefully')
  })

  setTimeout(() => process.exit(1), SHUTDOWN_DELAY_WHILE_LOG_WRITES_FINISH)
}

function shutdown() {
  console.log('Shuting down...')
  server.close(function() {
    console.log('http server closed gracefully')
  })

  setTimeout(() => process.exit(0), SHUTDOWN_DELAY_WHILE_LOG_WRITES_FINISH)
}