/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { currentUser } from '@nekosociety/common'
import type { Request, Response } from 'express'
import express from 'express'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.get('/api/users/current', currentUser, (req: Request, res: Response) => {
  return res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
