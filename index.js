import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import api from './src/api.js'
import loop from './src/loop.js'
import checkNodeVersion from './src/check-node-version.js'
const CONFIG_PATH = join(dirname(fileURLToPath(import.meta.url)), 'settings.json')

checkNodeVersion()

let config = {}
try {
  config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
} catch (error) {
  console.log('No settings file found or invalid JSON. Using default settings.')
}

api()
config.automatic && loop(config)
