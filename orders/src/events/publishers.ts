/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { IOrderCancelledEvent, IOrderCreatedEvent } from '@nekosociety/common'
import { ESubjects, Publisher } from '@nekosociety/common'
import type { Stan } from 'node-nats-streaming'

/*----------------------------------------------------------------------------
Class
----------------------------------------------------------------------------*/
export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
  constructor(client: Stan) {
    super(client)
  }

  readonly subject = ESubjects.OrderCreated
}

export class OrderCancelledPublisher extends Publisher<IOrderCancelledEvent> {
  constructor(client: Stan) {
    super(client)
  }

  readonly subject = ESubjects.OrderCancelled
}
