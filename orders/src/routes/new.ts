/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { BadRequestError, EOrderStatus, NotFoundError, requireAuth, validateRequest } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { OrderCreatedPublisher } from '../events/publishers'
import { Order } from '../models/order'
import { Product } from '../models/product'
import { natsClient } from '../nats-client'

const EXPIRATION_WINDOW_SECONDS = 15 * 60

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.post(
  '/api/orders',
  requireAuth,
  [
    body('productId')
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Product is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.body

    const product = await Product.findById(productId)

    if (!product) {
      throw new NotFoundError()
    }

    const isReserved = await product.isReserved()

    if (isReserved) {
      throw new BadRequestError('Product is already reserved')
    }

    const expiresAt = new Date()
    expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRATION_WINDOW_SECONDS)

    const order = new Order({ expiresAt, product, userId: req.currentUser?.id, status: EOrderStatus.Created })
    await order.save()

    await new OrderCreatedPublisher(natsClient.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      product: { id: product.id, title: product.title, price: product.price },
      expiresAt: order.expiresAt.toISOString(),
    })

    res.status(201).send(order)
  }
)

export { router as newOrderRouter }
