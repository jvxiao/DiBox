const { login } = require('../controller/user')
const redis = require('../conf/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getCookieExpires } = require('../util/common')


const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.url.split('?')[0]
    const userId = req.cookie.userId
    const { username, password }  = req.body

    // 用户登录
    if (method === 'POST' && path === '/api/user/login') {
        let result = login(username, password)
        return result.then(data => {
            if(data[0]) {
                if (data[0].userName) {
                    redis.set(userId, { username: username })
                    return new SuccessModel(data[0], '登录成功')
                }    
            } else {
                return new ErrorModel('用户名或密码不正确')
            }   
        })
    }

    // 用户在线状态校验
    if (method === 'GET' && path === '/api/user/loginCheck') {
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    session: req.session
                }, '用户已登录')
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登录')
        ) 
    }
}

module.exports = handleUserRouter