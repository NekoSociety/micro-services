/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import request from 'supertest'

import { app } from '../../app'
import { Product } from '../../models/product'
import { getCookie } from '../../test/setup'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
const title = 'product'

it('fetches the order', async () => {
  const cookie = await getCookie()

  // Create a product
  const product = new Product({
    title,
    price: 20,
  })

  await product.save()

  // make a request to build an order with this product
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ productId: product.id })
    .expect(201)

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(fetchedOrder.id).toEqual(order.id)
})

it('returns an error if one user tries to fetch another users order', async () => {
  const cookie1 = await getCookie()
  const cookie2 = await getCookie()

  // Create a product
  const product = new Product({
    title,
    price: 20,
  })

  await product.save()

  // make a request to build an order with this product
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie1)
    .send({ productId: product.id })
    .expect(201)

  // make request to fetch the order
  await request(app).get(`/api/orders/${order.id}`).set('Cookie', cookie2).send().expect(401)
})
