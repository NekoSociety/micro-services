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
const buildProduct = async () => {
  const product = new Product({
    title,
    price: 20,
  })
  await product.save()

  return product
}

it('fetches orders for an particular user', async () => {
  // Create three products
  const productOne = await buildProduct()
  const productTwo = await buildProduct()
  const productThree = await buildProduct()

  const cookieOne = await getCookie()
  const cookieTwo = await getCookie()
  // Create one order as User #1
  await request(app).post('/api/orders').set('Cookie', cookieOne).send({ productId: productOne.id }).expect(201)

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookieTwo)
    .send({ productId: productTwo.id })
    .expect(201)
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookieTwo)
    .send({ productId: productThree.id })
    .expect(201)

  // Make request to get orders for User #2
  const response = await request(app).get('/api/orders').set('Cookie', cookieTwo).expect(200)

  // Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2)
  expect(response.body[0].id).toEqual(orderOne.id)
  expect(response.body[1].id).toEqual(orderTwo.id)
  expect(response.body[0].product.id).toEqual(productTwo.id)
  expect(response.body[1].product.id).toEqual(productThree.id)
})
