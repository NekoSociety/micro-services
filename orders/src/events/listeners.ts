/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { IOrderCancelledEvent, IProductCreatedEvent, IProductUpdatedEvent } from '@nekosociety/common'
import { ESubjects, Listener } from '@nekosociety/common'
import type { Message, Stan } from 'node-nats-streaming'

import { Product } from '../models/product'

import { queueGroupName } from './queue-group-name'

/*----------------------------------------------------------------------------
Class
----------------------------------------------------------------------------*/
export class ProductCreatedListener extends Listener<IProductCreatedEvent> {
  constructor(client: Stan) {
    super(client)
  }

  readonly subject = ESubjects.ProductCreated
  readonly queueGroupName = queueGroupName

  async onMessage(data: IProductCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data

    const product = new Product({ _id: id, title, price })
    await product.save()

    msg.ack()
  }
}

export class ProductUpdatedListener extends Listener<IProductUpdatedEvent> {
  constructor(client: Stan) {
    super(client)
  }

  readonly subject = ESubjects.ProductUpdated
  readonly queueGroupName = queueGroupName
  async onMessage(data: IProductUpdatedEvent['data'], msg: Message) {
    const { id, title, price } = data
    const product = await Product.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    product.set({ title, price })
    await product.save()

    msg.ack()
  }
}
