/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { requireAuth, validateRequest } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'
import { body } from 'express-validator'

import { ProductCreatedPublisher } from '../events/publishers'
import { Product } from '../models/product'
import { natsClient } from '../nats-client'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.post(
  '/api/products',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body

    const product = new Product({ title, price, userId: req.currentUser!.id })
    await product.save()

    await new ProductCreatedPublisher(natsClient.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
    })

    res.status(201).send(product)
  }
)

export { router as newProductRouter }
