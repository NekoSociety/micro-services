/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import mongoose from 'mongoose'
import request from 'supertest'

import { app } from '../../app'
import { natsClient } from '../../nats-client'
import { getCookie } from '../../test/setup'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
const title = 'product'

it('returns a 404 if the provided id does not exist', async () => {
  const cookie = await getCookie()

  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/products/${id}`)
    .set('Cookie', cookie)
    .send({
      title,
      price: 20,
    })
    .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/products/${id}`)
    .send({
      title,
      price: 20,
    })
    .expect(401)
})

it('returns a 401 if the user does not own the product', async () => {
  const cookie = await getCookie()
  const newCookie = await getCookie()

  const response = await request(app).post('/api/products').set('Cookie', cookie).send({
    title,
    price: 20,
  })

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', newCookie)
    .send({
      title,
      price: 1000,
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = await getCookie()

  const response = await request(app).post('/api/products').set('Cookie', cookie).send({
    title,
    price: 20,
  })

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400)

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title,
      price: -10,
    })
    .expect(400)
})

it('updates the product provided valid inputs', async () => {
  const cookie = await getCookie()

  const response = await request(app).post('/api/products').set('Cookie', cookie).send({
    title,
    price: 20,
  })

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200)

  const productResponse = await request(app).get(`/api/products/${response.body.id}`).send()

  expect(productResponse.body.title).toEqual('new title')
  expect(productResponse.body.price).toEqual(100)
})

it('publishes an event', async () => {
  const cookie = await getCookie()

  const response = await request(app).post('/api/products').set('Cookie', cookie).send({
    title,
    price: 20,
  })

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200)

  expect(natsClient.client.publish).toHaveBeenCalled()
})
