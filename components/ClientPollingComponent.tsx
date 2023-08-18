'use client'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    next: { tags: ['collection'] },
  })
  const data = await res.json()
  console.log('data', data)
  return data
}

enum PollingStatus {
  POLLING = 'POLLING',
  STOPPED = 'STOPPED',
  ENQUEUED = 'ENQUEUED',
}

const OptimizedPollingComponent = () => {
  const [pollingStatus, setPollingStatus] = useState<PollingStatus>(
    PollingStatus.STOPPED
  )
  const [message, setMessage] = useState<string>('')

  const [data, setData] = useState<any>(null)

  const fetchPollingValue = async () => {
    try {
      const response = await fetchData()

      setData(response)
      setMessage('Polled successfully. ')
    } catch (error) {
      console.error('Error fetching polling value:', error)
      setMessage('Error while polling.')
      if (error) {
        return error
      }
    }

    // Clear the message after 0.5 seconds
    setTimeout(() => {
      setMessage('Polling again...')
    }, 1000)
  }

  useEffect(() => {
    if (pollingStatus === PollingStatus.STOPPED) {
      setMessage('Polling stopped.')
      return
    }

    if (pollingStatus === PollingStatus.ENQUEUED) {
      setMessage('Polling enqueued.')
      return
    }

    fetchPollingValue()

    const intervalId = setInterval(fetchPollingValue, 2000)

    return () => {
      clearInterval(intervalId)
    }
  }, [pollingStatus])

  const handleTogglePolling = () => {
    setPollingStatus((prevPollingStatus) => {
      if (prevPollingStatus === PollingStatus.POLLING) {
        return PollingStatus.STOPPED
      }

      return PollingStatus.POLLING
    })
  }

  return (
    <div>
      {/* Display the polling value */}
      <p>Polling Value: {data?.title}</p>
      <p>Status: {message}</p>

      <Button onClick={handleTogglePolling}>
        {pollingStatus === PollingStatus.POLLING ? 'Stop' : 'Start'}
      </Button>
    </div>
  )
}

export default OptimizedPollingComponent
