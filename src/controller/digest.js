
const { exec }  = require('../conf/mysql')


const getList = (label, keyword) => {
    let sql = `select * from digest where 1=1`
    if (keyword) {
        sql += `and content like '%${keyword}%'`
    }
    return exec(sql)
}

const getDetail = (id) => {
    let sql =  `select * from digest where id = ${id}`
    return exec(sql)
}

const newDigest = (data = {}) => {
    let createTime = new Date().getTime()
    let { content, source, userId } = data
    let sql = `insert into digest(content, source, userId, createTime) values ('${content}', '${source}', '${userId}', '${createTime}')`
    return exec(sql)
} 

const updataDigest = (data ={}) => {
    let { content, source, userId, id } = data
    let pattern =  `where id='${id}'`
    sql = `update digest set `
    if (content) {
        sql += `content='${content}'`
    }
    if (source) {
        sql += `, source='${source}`
    }
    if (userId) {
        sql += `, userId='${userId}`
    }
    sql += pattern
    return exec(sql)
}

const delDigest = (id) => {
    let sql = `delete from digest where id=${id}`
    return exec(sql) 
}

module.exports = {
    getList,
    getDetail,
    newDigest,
    updataDigest,
    delDigest
}