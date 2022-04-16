
const querystring = require('querystring')
const handleDigestRouter = require('./src/router/digest')
const handleUserRouter = require('./src/router/user')
const { SuccessModel, ErrorModel} = require('./src/model/resModel')
const { resourceLimits } = require('worker_threads')


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