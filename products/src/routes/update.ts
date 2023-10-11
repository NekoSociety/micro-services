/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'
import { body } from 'express-validator'

import { ProductUpdatedPublisher } from '../events/publishers'
import { Product } from '../models/product'
import { natsClient } from '../nats-client'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.put(
  '/api/products/:id',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
      throw new NotFoundError()
    }

    if (product.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }

    product.set({ ...req.body })
    await product.save()

    await new ProductUpdatedPublisher(natsClient.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
    })

    res.send(product)
  }
)

export { router as updateProductRouter }
