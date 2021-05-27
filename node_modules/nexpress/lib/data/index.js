class Data {
  constructor (buffer) {
    if (!(buffer instanceof Buffer)) throw new Error('Data must be a buffer')
    this.buffer = buffer
  }
}

module.exports = Data
