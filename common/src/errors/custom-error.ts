/* ----------------------------------------------------------------------------
Class
---------------------------------------------------------------------------- */
export abstract class CustomError extends Error {
  abstract statusCode: number
  protected constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): Array<{ message: string; field?: string }>
}
