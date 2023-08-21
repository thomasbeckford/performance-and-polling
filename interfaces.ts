export interface Product {
  id: number
  name: string
  price: number
}

export enum QueueStatus {
  NOT_IN_QUEUE = 'not_in_queue',
  TICKET_AVAILABLE = 'ticket_available',
  ENQUEUED = 'enqueued',
  SOLD_OUT = 'sold_out',
  START_POLLING = 'start_polling',
}
