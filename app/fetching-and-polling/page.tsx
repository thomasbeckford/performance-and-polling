'use client'
import ClientPollingComponent from '@/components/ClientPollingComponent'
import { useContext } from 'react'
import { AppContext } from '@/providers/AppProvider'

export default function FetchingAndPolling() {
  const { availableTickets } = useContext(AppContext)

  return (
    <div>
      <ClientPollingComponent />

      <div className="flex justify-center items-center space-x-2">
        <div>Available tickets: {availableTickets}</div>
      </div>
    </div>
  )
}
