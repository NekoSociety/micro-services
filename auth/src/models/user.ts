/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { Schema, model } from 'mongoose'

import { Password } from '../services/password'

/* ----------------------------------------------------------------------------
Types
---------------------------------------------------------------------------- */
interface IUser {
  email: string
  password: string
}

/* ----------------------------------------------------------------------------
Schema
---------------------------------------------------------------------------- */
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

export const User = model<IUser>('User', userSchema)
