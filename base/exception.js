class Exception extends Error {
  constructor(msg = '服务器异常', errorCode = 9000, status = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = status
  }
}

class JoiException extends Exception {
  constructor(msg) {
    super()
    this.msg = msg
    this.errorCode = 9001
    this.status = 400
  }
}
module.exports = { Exception, JoiException }
