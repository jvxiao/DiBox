/*
 * @Descripttion: 
 * @Author: jvxiao <jvxiao@outlook.com>
 * @Date: 2022-04-21 21:59:22
 */
const { exec, escape }  = require('../conf/mysql')
const { crypt } = require('../util/crypt')
const login = (username, password) => {
    username = escape(username)
    password = escape(crypt(password))

    let sql = `select * from users where userName=${username} and password=${password}`
    return exec(sql)
}

module.exports = {
    login
}