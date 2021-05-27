const net = require('net')
const debug = require('debug')('nexpress')

const Pipeline = require('./pipeline')
const Response = require('./response')
const Data = require('./data')

const ONE_MINUTE = 1000 * 60

/**
 * Express like framework for TCP servers
 */
class Nexpress {
  /**
   * Constructs an instance of nexpress
   * @param {{
   *  timeOut: Number,
   *  timeOutHandler: Function
   * }} [options={}] - nexpress options
   */
  constructor (options = {}) {
    this.net = net.createServer()
    this.pipeline = new Pipeline()

    // Set default options
    this.options = {}
    this.options.timeOut = ONE_MINUTE
    this.options.timeOutHandler = socket => {
      socket.end()
      socket.destroy()
      debug('closed timed-out socket')
    }

    // Set user-defined options
    Object.entries(options).forEach(([option, value]) => this.set(option, value))

    this.setUpListeners()
  }

  /**
   * Sets an option to a specified value
   * @param {String} option - option name to set
   * @param {Any} value - value to set specified option to
   */
  set (option, value) {
    this.options[option] = value
    debug(`option ${option} set`)
  }

  /**
   * Adds a middleware to the pipeline. If provided an id will be added to the middleware
   * @param {String|Number} [id] - id to which this middleware should respond
   * @param {Function|Middleware} middleware - middleware function/instance to add to the pipeline
   */
  use (id, middleware) {
    this.pipeline.use(id, middleware)
  }

  /**
   * Sets up net listeners
   */
  setUpListeners () {
    this.net.on('connection', socket => {
      debug('handling incoming connection')
      socket.setTimeout(this.options.timeOut)
      socket.on('data', data => {
        this.pipeline.exec(
          new Data(data),
          new Response(socket)
        )
      })

      socket.on('timeout', () => this.options.timeOutHandler(socket))
    })

    this.net.on('close', () => debug('server closed'))

    this.net.on('error', error => {
      debug('caught server error %o', error)
      const errorCaught = this.net.listenerCount('error') > 1
      if (!errorCaught) throw new Error('Uncaught net error, please create an error eventhandler')
    })

    this.net.on('listening', () => {
      const { port } = this.net.address()
      debug('listening on %o', port)
    })
  }

  /**
   * Executes net.listen(...args)
   * @param {...args} args - arguments to send to net.listen
   */
  listen (...args) {
    this.net.listen(...args)
  }
}

Nexpress.Pipeline = Pipeline
Nexpress.Data = Data

module.exports = Nexpress
