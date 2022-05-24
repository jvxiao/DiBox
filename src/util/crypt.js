/*
 * @Descripttion: 
 * @Author: jvxiao <jvxiao@outlook.com>
 * @Date: 2022-05-22 23:09:33
 */
const crypto = require('crypto')

// 秘钥

const  CRYPT_KEY = 'cJK#34#12K'

const md5 = (content) => {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

const crypt = (content) => {
  let str = `toCrypt=${content}&secryptKey=${CRYPT_KEY}`
  return md5(str)
}

let result = crypt('admin')
console.log(result, result.length)

module.exports = {
  crypt
}