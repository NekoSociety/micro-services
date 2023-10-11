/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { Schema, model } from 'mongoose'

/* ----------------------------------------------------------------------------
Types
---------------------------------------------------------------------------- */
interface IProduct {
  title: string
  price: number
  userId: string
}

/* ----------------------------------------------------------------------------
Schema
---------------------------------------------------------------------------- */
const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

export const Product = model<IProduct>('Product', productSchema)
