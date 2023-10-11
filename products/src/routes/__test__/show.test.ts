/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import mongoose from 'mongoose'
import request from 'supertest'

import { app } from '../../app'
import { getCookie } from '../../test/setup'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
const title = 'product'

it('returns a 404 if the product is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app).get(`/api/products/${id}`).send().expect(404)
})

it('returns the product if the product is found', async () => {
  const cookie = await getCookie()
  const price = 20

  const response = await request(app)
    .post('/api/products')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    })
    .expect(201)

  const productResponse = await request(app).get(`/api/products/${response.body.id}`).send().expect(200)

  expect(productResponse.body.title).toEqual(title)
  expect(productResponse.body.price).toEqual(price)
})
