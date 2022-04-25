const { exec }  = require('../conf/mysql')

const login = (username, password) => {

    let sql = `select * from users where userName='${username}' and password='${password}'`
    return exec(sql)
}

module.exports = {
    login
}