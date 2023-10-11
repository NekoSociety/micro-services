/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { NotFoundError, currentUser, errorHandler } from '@nekosociety/common'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'

import 'express-async-errors'
import { indexProductRouter } from './routes'
import { deleteProductRouter } from './routes/delete'
import { newProductRouter } from './routes/new'
import { showProductRouter } from './routes/show'
import { updateProductRouter } from './routes/update'

/* ----------------------------------------------------------------------------
App
---------------------------------------------------------------------------- */
const app = express()
app.set('trust proxy', true)

/*----------------------------------------------------------------------------
Middleware
----------------------------------------------------------------------------*/
app.use(json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)
app.use(currentUser)
app.use(errorHandler)

/*----------------------------------------------------------------------------
Routes
----------------------------------------------------------------------------*/
app.use(newProductRouter)
app.use(showProductRouter)
app.use(deleteProductRouter)
app.use(indexProductRouter)
app.use(updateProductRouter)
app.get('*', () => {
  throw new NotFoundError()
})

export { app }
