/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { ESubjects } from './subjects'
import type { EOrderStatus } from './types'

/*----------------------------------------------------------------------------
Events
----------------------------------------------------------------------------*/
export interface IOrderCreatedEvent {
  subject: ESubjects.OrderCreated
  data: {
    id: string
    expiresAt: string
    status: EOrderStatus
    userId: string
    product: { id: string; title: string; price: number }
  }
}

export interface IOrderCancelledEvent {
  subject: ESubjects.OrderCancelled
  data: {
    id: string
    expiresAt: string
    status: EOrderStatus
    userId: string
    product: { id: string; title: string; price: number }
  }
}
