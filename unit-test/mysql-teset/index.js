const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'testdata'
})

con.connect()


// const sql = 'select * from users'

// const sql = `update users set userNameCN='超级管理员' where username='admin'`

const sql = `insert into digest(content, userId, source) values ('插入数据测试', 1, 'www.baidu.com');`

con.query(sql, (err, res) => {
    if (err) {
        console.error(err)
        return 
    }
    console.log(res)
})
con.end()