import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://steady-fox-45066.upstash.io',
  token:
    'AbAKASQgODlkOTZmNzMtNDNiNC00ZGEzLTk0OTAtMjY5YzMwZWE5ZWQ2ZjlkYmM2MDNiNzM4NGE3NTg2YjZkNWRkZDhhYTdlY2U=',
})

// Define the initial ticket data
const initialTicketData = {
  available: 10,
  sold: 0,
  reserved: 0,
  reservedBy: [],
}

// Convert the object to a JSON string before storing it in Redis
const initialTicketDataJSON = JSON.stringify(initialTicketData)

// Set the initial ticket data in Redis
redis
  .set('tickets', 10)
  .then(() => {
    console.log('Initial ticket data set successfully')
  })
  .catch((error: any) => {
    console.error('Error setting initial ticket data:', error)
  })

export default redis
