/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import request from 'supertest'

import { app } from '../../app'
import { getCookie } from '../../test/setup'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
const title = 'product'

const createTicket = async () => {
  const cookie = await getCookie()

  return request(app).post('/api/products').set('Cookie', cookie).send({
    title,
    price: 20,
  })
}

it('can fetch a list of product', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app).get('/api/products').send().expect(200)

  expect(response.body.length).toEqual(3)
})
