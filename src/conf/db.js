const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'testdata'
    }
}

if (env === 'prod') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'testdata'
    }
}

module.exports = {
    MYSQL_CONF
}