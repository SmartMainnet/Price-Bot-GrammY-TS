import { checkPrice } from './utils/index.js'

const run = () => {
  checkPrice()
  setInterval(checkPrice, 5 * 60 * 1000)
}

const now = new Date()
const minutes = now.getMinutes()
const minutesToNextDivisibleByFive = (5 - (minutes % 5)) % 5
const nextMinute = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours(),
  now.getMinutes() + minutesToNextDivisibleByFive
)
const delay = nextMinute.getTime() - now.getTime()
setTimeout(run, delay)

// shutdown
process.on('SIGINT', () => {
  console.log('SIGINT signal received')
  process.exit(0)
})
