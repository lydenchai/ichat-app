class Response {
  constructor (socket) {
    this.socket = socket
  }

  send (data) {
    this.socket.write(data)
  }

  end (data = null) {
    this.socket.end(data)
  }
}

module.exports = Response
