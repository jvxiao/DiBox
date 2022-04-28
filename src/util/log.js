const fs = require('fs')
const path = require('path')

// 写 log 
const accessWriteStream  = createWriteSteam('access.log')
const errorWriteStream = createWriteSteam('error.log')
const eventWriteStream = createWriteSteam('event.log')


function createWriteSteam(filename) {
  const filepath = path.resolve(__dirname, '../../', 'logs', filename)
  const readStream = fs.createWriteStream(filepath)
  return readStream
}

function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}


// access log
function logAccess(log) {
  writeLog(accessWriteStream, log)
}

function logError(log) {
  writeLog(errorWriteStream, log)
}

function logEvent(log) {
  writeLog(errorWriteStream, log)
}

module.exports = {
  logAccess,
  logError,
  logEvent
}