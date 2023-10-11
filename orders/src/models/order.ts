/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { EOrderStatus } from '@nekosociety/common'
import mongoose, { Schema, model } from 'mongoose'

import type { IProduct } from './product'

/* ----------------------------------------------------------------------------
Types
---------------------------------------------------------------------------- */
interface IOrder {
  expiresAt: Date
  product: IProduct
  status: EOrderStatus
  userId: string
}

/* ----------------------------------------------------------------------------
Schema
---------------------------------------------------------------------------- */
const orderSchema = new Schema<IOrder>(
  {
    expiresAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(EOrderStatus),
      default: EOrderStatus.Created,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
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

export const Order = model<IOrder>('Order', orderSchema)
