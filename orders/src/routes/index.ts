/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { requireAuth } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'

import { Order } from '../models/order'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser?.id,
  }).populate('product')

  res.send(orders)
})

export { router as indexOrderRouter }
