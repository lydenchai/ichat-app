# nexpress
Express.js-like framework for TCP servers

## Examples

```js
// Creating a simple nexpress tcp server
const Nexpress = require('nexpress')
const app = new Nexpress()

// Middleware to identify incoming data
app.use((data, res, next) => {
  data.id = computeDataId(data.buffer)
  next()
})

// Middleware to handle some data with id 'greeting'
app.use('greeting', (data, res) => {
  res.send(Buffer.from('Nexpress has received your greeting!'))
})

// Middleware that throws an error
app.use((data, res, next) => {
  next(new Error('Something went wrong!'))
})

// Error handler middleware
// Error handlers *must* have 4 parameters
app.use((error, data, res, next) => {
  handleError(error)
})

app.listen(3000, () => console.log('Nexpress is now listening on port 3000'))
```

```js
// Pipelines can be used to group middlewares together.
// They behave like a normal middleware, much like express routers
const Nexpress = require('nexpress')
const app = new Nexpress()

const pipeline = new nexpress.Pipeline()
pipeline.use((data, res) => {
  res.send(Buffer.from('This is a simple pipeline'))
})

app.use(pipeline)

app.listen(3000)
```
