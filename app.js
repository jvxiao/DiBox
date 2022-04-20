
const querystring = require('querystring')
const handleDigestRouter = require('./src/router/digest')
const handleUserRouter = require('./src/router/user')
const { SuccessModel, ErrorModel} = require('./src/model/resModel')


const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    console.log(d.toGMTString())
    return d.toGMTString()
}

const SESSTION_DATA = {}
// 处理post data
const getPostData = (req) => {
    debugger
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

const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    // const resData = {
    //     name: 'Kekeli',
    //     cute: 100,
    //     env: process.env.NODE_ENV
    // }

    // 解析query
    req.query = querystring.parse(req.url.split('?')[1])

    // 解析cookie
    const cookieStr = req.headers.cookie || ''
    req.cookie = {}
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0]
        const value = arr[1]

        req.cookie[key] = value
    });
    console.log('cookie', req.cookie)


    // 解析 Session
    let needSetCookie = false
    let userId = req.cookie.userId

    if (userId) {
        if (!SESSTION_DATA[userId]) {
            SESSTION_DATA[userId]  = {}
        } 
    } else {
            console.log(1)
            needSetCookie = true
            userId = `${Date.now()}_${Math.random()}}`
            SESSTION_DATA[userId] = {}

    }
    req.session = SESSTION_DATA[userId]
    console.log('处理', req.session)
    // 处理post Data
    getPostData(req).then(postData => {
        req.body = postData

        // 摘录路由 
        // const digestData = handleDigestRouter(req, res)
        // if (digestData) {
        //     res.end(
        //         JSON.stringify(digestData)
        //     )
        //     return 
        // }
        const blogResult = handleDigestRouter(req, res)
        // console.log('blog', blogResult)
        if (blogResult) {
            blogResult.then(digestData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `usrId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(digestData)
                )
            }, err => {
                res.end(
                    JSON.stringify(err)
                )
            } )
            return
        }
        

        // 用户路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return 
        // }
        const userResult = handleUserRouter(req, res)
        // console.log('user', userResult)
        if (userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            }, err => {
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