import os from 'node:os'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

const platforms = {
  win32: 'shutdown /s /t #TIME#',
  linux: 'sleep #TIME#; shutdown now',
  darwin: 'sleep #TIME#; shutdown now',
  default: 'NOT FOUND COMMAND'
}

export default (time = 0) => {
  const platform = os.platform()
  const command = platform in platforms
    ? platforms[platform]
        .replace('#TIME#', time)
    : platforms.default

  return execPromise(command)
}
