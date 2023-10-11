/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { type ValidationError } from 'express-validator'

import { CustomError } from './custom-error'

/* ----------------------------------------------------------------------------
Class
---------------------------------------------------------------------------- */
export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(readonly errors: ValidationError[]) {
    super('Invalid request parameters')

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map((error) =>
      error.type === 'field' ? { message: error.msg, field: error.path } : { message: error.msg }
    )
  }
}
