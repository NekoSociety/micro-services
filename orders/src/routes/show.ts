/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { NotAuthorizedError, NotFoundError } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'

import { Order } from '../models/order'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.get('/api/orders/:id', async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('product')

  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError()
  }

  res.send(order)
})

export { router as showOrderRouter }
