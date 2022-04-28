
const querystring = require('querystring')
const handleDigestRouter = require('./src/router/digest')
const handleUserRouter = require('./src/router/user')
const redis = require('./src/conf/redis')
const { SuccessModel, ErrorModel} = require('./src/model/resModel')
const { getCookieExpires, getPostData} = require('./src/util/common')
const { logAccess }  = require('./src/util/log')

const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    // 写日志
    logAccess(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 解析query
    req.query = querystring.parse(req.url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return 
        const arr = item.split('=')
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    });

    // 解析 Session
    let needSetCookie = false
    let userId = req.cookie.userId


    if (!userId) {
        userId = `${Date.now()}_${Math.random()}`
        needSetCookie = true
        redis.set(userId, {})
    }

    req.sessionId = userId

    redis.get(userId).then(resData => {
        if(resData === null) {
            redis.set(userId, {})
            req.session = {}
        } else {
            req.session = resData
        }
        return   getPostData(req)
    })


    .then(postData => {
        req.body = postData

        const blogResult = handleDigestRouter(req, res)
        if (blogResult) {
            blogResult.then(digestData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `usrId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(digestData)
                )
            }).catch(err => {
                res.end(
                    JSON.stringify(err)
                )
            })
            return
        }
        
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            }).catch(err => {
                res.end(
                    JSON.stringify(err)
                )
            })
            return 
        }
    
        res.end('404 Not Found!')
     })

}

module.exports = serverHandler