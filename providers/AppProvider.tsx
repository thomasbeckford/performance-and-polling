'use client'

import { createContext, ReactNode, useState, useEffect } from 'react'
import { QueueStatus } from '@/interfaces'
import redis from '@/lib/redis'

interface AppContextInterface {
  queueStatus: QueueStatus
  setQueueStatus: (pollingStatus: QueueStatus) => void
  purchaseReady: boolean
  setPurchaseReady: (purchaseReady: boolean) => void
  ticketToPurchase: number
  setTicketToPurchase: (ticketToPurchase: number) => void
  handleTogglePolling: () => void
  handleCheckout: () => void
  handleLeaveCheckout: () => void
  availableTickets: number
  setAvailableTickets: (availableTickets: number) => void
}

export const AppContext = createContext<AppContextInterface>({
  queueStatus: QueueStatus.NOT_IN_QUEUE,
  setQueueStatus: () => {},
  purchaseReady: false,
  setPurchaseReady: () => {},
  ticketToPurchase: 0,
  setTicketToPurchase: () => {},
  handleTogglePolling: () => {},
  handleCheckout: () => {},
  handleLeaveCheckout: () => {},
  availableTickets: 0,
  setAvailableTickets: () => {},
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [purchaseReady, setPurchaseReady] = useState<boolean>(false)
  const [ticketToPurchase, setTicketToPurchase] = useState<number>(1)
  const [availableTickets, setAvailableTickets] = useState<number>(0)
  const [queueStatus, setQueueStatus] = useState<QueueStatus>(
    QueueStatus.NOT_IN_QUEUE
  )

  const handleTogglePolling = () => {
    setQueueStatus((prevQueueStatus) => {
      if (prevQueueStatus === QueueStatus.ENQUEUED) {
        return QueueStatus.NOT_IN_QUEUE
      }

      return QueueStatus.START_POLLING
    })
  }

  const decrementTickets = async () => {
    await redis.decr('tickets')
  }

  const handleCheckout = async () => {
    decrementTickets()
    setPurchaseReady(false)
    setAvailableTickets(
      (prevTicketsCount) => prevTicketsCount - ticketToPurchase
    )
  }

  const getAvailableTickets = async () => {
    const ticketsCount = await redis.get('tickets')
    setAvailableTickets(Number(ticketsCount))
  }

  useEffect(() => {
    getAvailableTickets()
  }, [])

  const handleLeaveCheckout = () => {
    setQueueStatus(QueueStatus.NOT_IN_QUEUE)
    setPurchaseReady(false)
  }

  return (
    <AppContext.Provider
      value={{
        queueStatus,
        setQueueStatus,
        handleTogglePolling,
        handleCheckout,
        purchaseReady,
        setPurchaseReady,
        handleLeaveCheckout,
        availableTickets,
        ticketToPurchase,
        setTicketToPurchase,
        setAvailableTickets,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
