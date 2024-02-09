const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE

export default (config) => {
  console.log('Starting loop')
  setInterval(() => executeLoop(config), 30 * ONE_SECOND)
}

function executeLoop (config) {
  const { time } = config
  if (!time) {
    console.error('Time not set')
    return
  }

  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const hour = Number(time.split(':')[0])
  const minute = Number(time.split(':')[1])
  if (isNaN(hour) || isNaN(minute)) {
    console.error('Invalid time format')
    return
  }

  if (currentHour === hour && currentMinute === minute) {
    console.log('Shutting down')
    shutdown()
  }
}