/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { IProductCreatedEvent, IProductUpdatedEvent } from '@nekosociety/common'
import { ESubjects, Publisher } from '@nekosociety/common'
import type { Stan } from 'node-nats-streaming'

/*----------------------------------------------------------------------------
Class
----------------------------------------------------------------------------*/
export class ProductCreatedPublisher extends Publisher<IProductCreatedEvent> {
  constructor(client: Stan) {
    super(client)
  }

  readonly subject = ESubjects.ProductCreated
}

export class ProductUpdatedPublisher extends Publisher<IProductUpdatedEvent> {
  constructor(client: Stan) {
    super(client)
  }

  readonly subject = ESubjects.ProductUpdated
}
