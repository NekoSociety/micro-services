/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { NotFoundError } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'

import { Product } from '../models/product'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.get('/api/products/:id', async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    throw new NotFoundError()
  }

  res.send(product)
})

export { router as showProductRouter }
