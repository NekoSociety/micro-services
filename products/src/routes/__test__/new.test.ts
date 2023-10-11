/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import request from 'supertest'

import { app } from '../../app'
import { Product } from '../../models/product'
import { natsClient } from '../../nats-client'
import { getCookie } from '../../test/setup'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
const title = 'product'

it('has a route handler listening to /api/product for post requests', async () => {
  const response = await request(app).post('/api/products').send({})

  expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/products').send({}).expect(401)
})

it('returns a status other than 401 if the user is signed in', async () => {
  const cookie = await getCookie()

  const response = await request(app).post('/api/products').set('Cookie', cookie).send({})

  expect(response.status).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async () => {
  const cookie = await getCookie()

  await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 10,
    })
    .expect(400)

  await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      price: 10,
    })
    .expect(400)
})

it('returns an error if an invalid price is provided', async () => {
  const cookie = await getCookie()

  await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title,
      price: -10,
    })
    .expect(400)

  await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title,
    })
    .expect(400)
})

it('creates a product with valid inputs', async () => {
  const cookie = await getCookie()

  let products = await Product.find({})
  expect(products.length).toEqual(0)

  await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title,
      price: 20,
    })
    .expect(201)

  products = await Product.find({})
  expect(products.length).toEqual(1)
  expect(products[0].price).toEqual(20)
  expect(products[0].title).toEqual(title)
})

it('publishes an event', async () => {
  const cookie = await getCookie()

  await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title,
      price: 20,
    })
    .expect(201)

  expect(natsClient.client.publish).toHaveBeenCalled()
})
