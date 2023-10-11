/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { EOrderStatus } from '@nekosociety/common'
import type { Model } from 'mongoose'
import { Schema, model } from 'mongoose'

import { Order } from './order'

/* ----------------------------------------------------------------------------
Types
---------------------------------------------------------------------------- */
export interface IProduct {
  id: string
  title: string
  price: number
}

interface IProductMethods {
  isReserved(): Promise<boolean>
}

type TProductModel = Model<IProduct, NonNullable<unknown>, IProductMethods>

/* ----------------------------------------------------------------------------
Schema
---------------------------------------------------------------------------- */
const productSchema = new Schema<IProduct, TProductModel, IProductMethods>(
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

productSchema.method('isReserved', async function () {
  const existingOrder = await Order.findOne({
    product: this,
    status: { $in: [EOrderStatus.AwaitingPayment, EOrderStatus.Complete, EOrderStatus.Created] },
  })

  return !!existingOrder
})
export const Product = model<IProduct, TProductModel>('Product', productSchema)
