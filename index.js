import express from 'express'
import os from 'node:os'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const execPromise = promisify(exec)
const app = express()
const port = 9876

const platforms = {
  win32: 'shutdown /s /t #TIME#',
  linux: 'sleep #TIME#; shutdown now',
  darwin: 'sleep #TIME#; shutdown now',
  default: 'NOT FOUND COMMAND'
}

app.get('/', (_, res) => {
  const p = join(
    dirname(fileURLToPath(import.meta.url)),
    'index.html'
  )
  res.sendFile(p)
})

app.get('/shutdown', async (req, res) => {
  const { time } = req.query
  const platform = os.platform()
  const command = platform in platforms
    ? platforms[platform].replace('#TIME#', time)
    : platforms.default

  try {
    execPromise(command)
    res.send({ message: 'Shutting down' })
  } catch (error) {
    res.status(500).send({ message: 'Error shutting down' })
    console.error(err) 
  }
})

app.listen(port, () => {
  console.log('Server running on port ' + port)
})