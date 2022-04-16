const { getList, getDetail, newDigest, updataDigest, delDigest } = require('../controller/digest')
const { SuccessModel, ErrorModel }  = require('../model/resModel')

const handleDigestRouter = (req, res) => {
    const method = req.method
    const path = req.url.split('?')[0]
    const id = req.query.id
    // 列表
    if (method === 'GET' && path === '/api/digest/list') {
        const label = req.query.label || ''
        const keyword = req.query.keyword || ''
        const result = getList(label, keyword)
        return result.then(listData => {
            return new SuccessModel(listData) 
        })

    }

    // 详情
    if (method === 'GET' && path === '/api/digest/detail') {
        const id = req.query.id || ''

        if (id) {
            const result = getDetail(id) 
            return result.then(detail => {
                return new SuccessModel(detail[0])
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve(new ErrorModel('参数不正确'))
            })
        }
        
    }

    // 新增
    if (method === 'POST' && path === '/api/digest/add') {
        const digsetData = req.body
        let result = newDigest(digsetData)
        return result.then(res => {
            return new SuccessModel({id: res.insertId})
        })
    }

    // 更新
    if (method === 'POST' && path === '/api/digest/update') {
        let id = req.body.id
        if (id) {
            const result = updataDigest(req.body)
            return  result.then(data => {
                return new SuccessModel(data.affectedRows  ? '更新成功' : '更新失败')
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve(new ErrorModel('参数不正确'))
            })
        }
        
    }

    // 删除
    if (method === 'POST' && path === '/api/digest/del') {
        let { id } = req.body
        if (id) {
            const result = delDigest(id)
            return  result.then(res => {
                return new SuccessModel(res.affectedRows ? '删除成功' : '删除失败')
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve(new ErrorModel('参数不正确'))
            })
        }
    }
}

module.exports = handleDigestRouter