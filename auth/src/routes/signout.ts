/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import type { Request, Response } from 'express'
import express from 'express'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.post('/api/users/signout', (req: Request, res: Response) => {
  req.session = null
  res.send({})
})

export { router as signOutRouter }
