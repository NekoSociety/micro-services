/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { type NextFunction, type Request, type Response } from 'express'

import { CustomError } from '../errors/custom-error'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  console.error(err)
  res.status(400).send({
    message: 'F in the chat',
  })
}
