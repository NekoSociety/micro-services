/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { CustomError } from './custom-error'

/* ----------------------------------------------------------------------------
Class
---------------------------------------------------------------------------- */
export class NotAuthorizedError extends CustomError {
  statusCode = 401
  reason = 'Not authorized'
  constructor() {
    super('Not authorized')

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
