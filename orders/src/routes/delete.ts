/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { EOrderStatus, NotAuthorizedError, NotFoundError, requireAuth } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'

import { OrderCancelledPublisher } from '../events/publishers'
import { Order } from '../models/order'
import { natsClient } from '../nats-client'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.delete('/api/orders/:id', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('product')

  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError()
  }

  order.status = EOrderStatus.Cancelled
  await order.save()

  await new OrderCancelledPublisher(natsClient.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    product: { id: order.product.id, title: order.product.title, price: order.product.price },
    expiresAt: order.expiresAt.toISOString(),
  })

  res.status(204).send(order)
})

export { router as deleteOrderRouter }
