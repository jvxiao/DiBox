
const redis = require('redis')

const cli = redis.createClient()

cli.connect()


// 插值
const set = (key, value) => {
  const promise = new Promise((resolve, reject) => {
    cli.set(key, value).then(res => {
      resolve(1)
    }).catch(err => {
      reject(err)
    })
  })
  return promise
}

// 取值
const get = (key) => {
  const promise = new Promise((resolve, reject) => {
    cli.get(key).then(res => {
      if(res) {
        resolve(res)
        return 
      }
      resolve(null)
    }).catch(err => {
      reject(err)
    })
  })
  return promise
}

// 删除
const remove = (key) => {
  const promise = new Promise((resolve, reject) => {
    cli.del(key).then(res => {
      resolve(1)
    }).catch(err => {
      reject(err)
    })
  })
  return promise
}

// 关闭连接
const close = () => {
  cli.quit()
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

module.exports = {
  set,
  get,
  remove,
  close,
}