/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { BadRequestError, validateRequest } from '@nekosociety/common'
import express, { type Request, type Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'

/* ----------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------- */
const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must have at least 8 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email already in use')
    }

    const user = new User({ email, password })
    await user.save()

    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!)

    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signUpRouter }
