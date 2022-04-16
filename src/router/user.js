const { login } = require('../controller/user')
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

    // const { username, password }  = req.body
    const { username, password }  = req.query

    if (method === 'GET' && path === '/api/user/login') {
        debugger
        let result = login(username, password)
        res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        console.log(username, password)
        return result.then(data => {
            if(data[0]) {
                return new SuccessModel(data[0], '登录成功')
            } else {
                return new ErrorModel('用户名或密码不正确')
            }
            
        }, err => {
            console.log(err)
            return new ErrorModel(err)
        })
    }
}

module.exports = handleUserRouter