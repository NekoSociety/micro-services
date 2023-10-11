/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import type { NextFunction } from 'express'
import { type Request, type Response } from 'express'

import { NotAuthorizedError } from '../errors/not-authorized-error'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  next()
}
