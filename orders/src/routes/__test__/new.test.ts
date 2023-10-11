/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { EOrderStatus } from '@nekosociety/common'
import mongoose from 'mongoose'
import request from 'supertest'

import { app } from '../../app'
import { Order } from '../../models/order'
import { Product } from '../../models/product'
import { natsClient } from '../../nats-client'
import { getCookie } from '../../test/setup'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
const title = 'product'

it('returns an error if the product does not exist', async () => {
  const cookie = await getCookie()
  const productId = new mongoose.Types.ObjectId()

  await request(app).post('/api/orders').set('Cookie', cookie).send({ productId }).expect(404)
})

it('returns an error if the product is already reserved', async () => {
  const cookie = await getCookie()
  const userId = new mongoose.Types.ObjectId().toHexString()

  const product = new Product({
    title,
    price: 20,
  })
  await product.save()
  const order = new Order({
    product,
    userId,
    status: EOrderStatus.Created,
    expiresAt: new Date(),
  })
  await order.save()

  await request(app).post('/api/orders').set('Cookie', cookie).send({ productId: product.id }).expect(400)
})

it('reserves a product', async () => {
  const cookie = await getCookie()
  const product = new Product({
    title,
    price: 20,
  })
  await product.save()

  await request(app).post('/api/orders').set('Cookie', cookie).send({ productId: product.id }).expect(201)
})

it('emits an order created event', async () => {
  const cookie = await getCookie()
  const product = new Product({
    title,
    price: 20,
  })

  await product.save()

  await request(app).post('/api/orders').set('Cookie', cookie).send({ productId: product.id }).expect(201)

  expect(natsClient.client.publish).toHaveBeenCalled()
})
