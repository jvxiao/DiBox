class BaseModel {
    constructor(data, msg) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            msg = null
        }
        if (data) {
            this.data = data
        }
        if (msg) {
            this.message = msg
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.errorno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg) 
        this.errorno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}