// 设置cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  console.log(d.toGMTString())
  return d.toGMTString()
}

// 处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
      if (req.method !== 'POST') {
          resolve ({})
          return 
      }
      if (req.headers['content-type'] !== 'application/json') {
          resolve({})
          return 
      }
      // 接收数据
      let postData = ''
      req.on('data', chuck => {
          postData += chuck.toString()
      })
      req.on('end', () => {
          if (!postData) {
              resolve({})
              return 
          }
          resolve(
              JSON.parse(postData)
          )
      })
  })
  return  promise
}


module.exports = {
    getCookieExpires,
    getPostData
}