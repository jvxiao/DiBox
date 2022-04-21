const { login } = require('../controller/user')
const redis = require('../conf/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel') 

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    console.log(d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.url.split('?')[0]
    const userId = req.cookie.userId
    // const { username, password }  = req.body
    const { username, password }  = req.query

    if (method === 'GET' && path === '/api/user/login') {
        let result = login(username, password)
        // res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        console.log(username, password)
        return result.then(data => {
            if(data[0]) {
                if (data[0].userName) {
                    redis.set(userId, JSON.stringify({ username: username }))
                    return new SuccessModel(data[0], '登录成功')
                }    
            } else {
                return new ErrorModel('用户名或密码不正确')
            }
            
        }, err => {
            return new ErrorModel(err)
        })
    }

    if (method === 'GET' && path === '/api/user/loginCheck') {
        return redis.get(userId).then(res => {
            res = JSON.parse(res)
            if (res && res.username) {
                return Promise.resolve(
                    new SuccessModel({
                        session: res
                    }, '用户已登录')
                )
            }
            return Promise.resolve(
                new ErrorModel('尚未登录')
            ) 
        })
    }
}

module.exports = handleUserRouter