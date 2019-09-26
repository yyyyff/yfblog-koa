// TODO：先定义errorCode，不要乱写

class Exception extends Error {
  constructor(msg = '服务器异常', errorCode = 9000, status = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = status
  }
}

// TODO: 改进msg，不要输出过多不不要的内容
class JoiException extends Exception {
  constructor(msg) {
    super()
    this.msg = msg
    this.errorCode = 9001
    this.status = 400
  }
}

class SuccessException extends Exception {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'success'
    this.errorCode = errorCode || 0
    this.status = 201
  }
}

class AuthFailed extends Exception {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || -1
    this.status = 401
  }
}

class Forbbiden extends Exception {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.error_code = error_code || -1
    this.code = 403
  }
}

module.exports = {
  Exception,
  JoiException,
  SuccessException,
  AuthFailed,
  Forbbiden
}
