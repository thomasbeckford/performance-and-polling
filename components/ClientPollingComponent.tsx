'use client'
import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { QueueStatus } from '@/interfaces'
import { useContext } from 'react'
import { AppContext } from '@/providers/AppProvider'

const OptimizedPollingComponent = () => {
  const {
    queueStatus,
    handleTogglePolling,
    setPurchaseReady,
    purchaseReady,
    setQueueStatus,
    handleCheckout,
    handleLeaveCheckout,
  } = useContext(AppContext)

  const fetchPollingValue = async () => {
    try {
      if (queueStatus === QueueStatus.NOT_IN_QUEUE) {
        return
      }
      const response = await checkAvailability(queueStatus)
      if (response) {
        if (response.status === QueueStatus.TICKET_AVAILABLE) {
          // Backend response triggers stop polling
          setPurchaseReady(true)
          setQueueStatus(QueueStatus.NOT_IN_QUEUE)
        }

        if (queueStatus === QueueStatus.START_POLLING) {
          // Manually trigger polling

          setQueueStatus(QueueStatus.ENQUEUED)
        }
      }
    } catch (error) {
      console.error('Error fetching polling value:', error)
      setQueueStatus(QueueStatus.NOT_IN_QUEUE)
      if (error) {
        return error
      }
    }
  }

  useEffect(() => {
    fetchPollingValue()
    const intervalId = setInterval(fetchPollingValue, 2000)
    return () => {
      clearInterval(intervalId)
    }
  }, [queueStatus])

  return (
    <div>
      <p>Status: {queueStatus}</p>

      {purchaseReady ? (
        <div>
          <Button onClick={handleCheckout} color="secondary">
            Purchase ticket
          </Button>
          <Button onClick={handleLeaveCheckout} color="danger">
            Cancel purchase
          </Button>
        </div>
      ) : (
        <Button onClick={handleTogglePolling}>
          {queueStatus === QueueStatus.ENQUEUED ? 'Stop' : 'Start'}
        </Button>
      )}
    </div>
  )
}

export default OptimizedPollingComponent

async function checkAvailability(purchaseStatus: QueueStatus) {
  const userData = {
    name: 'John Doe',
    id: '1234567890',
  }

  const pollingApi =
    purchaseStatus === QueueStatus.ENQUEUED
      ? '/api/queue/enqueued'
      : purchaseStatus === QueueStatus.START_POLLING
      ? '/api/queue/start'
      : '/api/queue/stop'

  const res = await fetch(pollingApi, {
    method: 'POST',
    body: JSON.stringify({ userData }),
  })

  const data = await res.json()

  return data
}
