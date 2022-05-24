/*
 * @Descripttion: 
 * @Author: jvxiao <jvxiao@outlook.com>
 * @Date: 2022-04-21 21:59:22
 */
const mysql = require('mysql')
const { MYSQL_CONF } = require('./db')


const con = mysql.createConnection(MYSQL_CONF)
con.connect()

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
         reject(err)
          return 
      }
      resolve(res)
  })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}