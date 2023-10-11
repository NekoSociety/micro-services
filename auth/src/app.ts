/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { NotFoundError, errorHandler } from '@nekosociety/common'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'

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
    name: 'session',
    signed: false,
    secure: false, // process.env.NODE_ENV !== 'test',
  })
)
app.use(errorHandler)

/*----------------------------------------------------------------------------
Routes
----------------------------------------------------------------------------*/
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.get('*', () => {
  throw new NotFoundError()
})

export { app }
