/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import type { NextFunction } from 'express'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

/* ----------------------------------------------------------------------------
Types
---------------------------------------------------------------------------- */
interface IUserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload
  } catch (e) {
    console.error(e)
  }

  return next()
}
