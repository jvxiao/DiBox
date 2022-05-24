const fs = require('fs')
const path = require('path')
const readline = require('readline')

const filename = path.resolve(__dirname, '../../', 'logs', 'access.log')

const readStream = fs.createReadStream(filename)

const rl = readline.Interface({
  input: readStream
})

// 逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return
  }
  console.log(lineData)
})

// 读取完成
rl.on('close', () => {
  console.log('读取完毕')
})