import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import api from './src/api.js'
import loop from './src/loop.js'
const CONFIG_PATH = join(dirname(fileURLToPath(import.meta.url)), 'settings.json')

let config = {}
try {
  config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
} catch (error) {
  console.error('Error reading config file', error.message ?? '')
  process.exit(1)
}

api()
config.automatic && loop(config)
