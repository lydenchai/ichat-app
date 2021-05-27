const MiddlewareType = require('../enums/MiddlewareType')

class Middleware {
  constructor (method) {
    if (typeof method !== 'function') throw new Error('Middleware must be a method')
    this.exec = method
    this.type = MiddlewareType[method.length === 4 ? 'ERROR_HANDLER' : 'NORMAL_HANDLER']
  }
}

Middleware.MiddlewareType = MiddlewareType

module.exports = Middleware
