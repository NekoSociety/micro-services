/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { EOrderStatus } from '@nekosociety/common'
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

it('marks an order as cancelled', async () => {
  const cookie = await getCookie()
  // create a product with Product Model
  const product = new Product({
    title,
    price: 20,
  })

  await product.save()

  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ productId: product.id })
    .expect(201)

  // make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', cookie).send().expect(204)

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(EOrderStatus.Cancelled)
})

it('emits a order cancelled event', async () => {
  const cookie = await getCookie()
  const product = new Product({
    title,
    price: 20,
  })
  await product.save()

  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ productId: product.id })
    .expect(201)

  // make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', cookie).send().expect(204)

  expect(natsClient.client.publish).toHaveBeenCalled()
})
