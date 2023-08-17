'use client'
import { useState, useEffect } from 'react'

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
  const [data, setData] = useState<any>(null)

  const fetchPollingValue = async () => {
    try {
      const response = await fetchData()

      // Update the polling value
      setData(response)
    } catch (error) {
      console.error('Error fetching polling value:', error)
    }
  }

  useEffect(() => {
    if (pollingStatus === PollingStatus.STOPPED) {
      return
    }

    if (pollingStatus === PollingStatus.ENQUEUED) {
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

      <button
        onClick={handleTogglePolling}
        className="px-2 text-md border bg-blue-500 cursor-pointer"
      >
        {pollingStatus === PollingStatus.POLLING ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default OptimizedPollingComponent
