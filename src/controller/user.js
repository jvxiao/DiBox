const { exec }  = require('../conf/mysql')

const login = (username, password) => {

    let sql = `select * from users where userName='${username}' and password='${password}'`
    console.log(sql)
    return exec(sql)
    // if (username === 'admin' && password === 'admin') {
    //     return true
    // } else {
    //     return false
    // }
}

module.exports = {
    login
}