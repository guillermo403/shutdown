import express from 'express'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import shutdown from './shutdown.js'

export default () => {
  const app = express()
  const port = 9876

  app.get('/', sf)
  app.get('/shutdown', sc)
  app.listen(port, () => console.log(`http://localhost:${port}`))
}

function sf (_, res) {
  const p = join(
    dirname(fileURLToPath(import.meta.url)),
    'views',
    'index.html'
  )
  res.sendFile(p)
}

function sc (req, res) {
  const { time } = req.query

  try {
    shutdown(time)
    res.send({ message: 'Shutting down' })
  } catch (error) {
    res.status(500).send({ message: 'Error shutting down' })
    console.error(error) 
  }
}
