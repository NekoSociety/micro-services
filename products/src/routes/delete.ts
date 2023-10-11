/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { requireAuth, validateRequest } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'
import { body } from 'express-validator'

import { Product } from '../models/product'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.get('/api/products/:id', async (req: Request, res: Response) => {})

export { router as deleteProductRouter }
