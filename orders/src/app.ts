/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { NotFoundError, currentUser, errorHandler } from '@nekosociety/common'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'

import 'express-async-errors'
import { indexOrderRouter } from './routes'
import { deleteOrderRouter } from './routes/delete'
import { newOrderRouter } from './routes/new'
import { showOrderRouter } from './routes/show'
// import { updateOrderRouter } from './routes/update'

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
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)
app.use(indexOrderRouter)
// app.use(updateOrderRouter)
app.get('*', () => {
  throw new NotFoundError()
})

export { app }
