/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import jwt from 'jsonwebtoken'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

/* ----------------------------------------------------------------------------
Tests
---------------------------------------------------------------------------- */
let mongo: MongoMemoryServer
jest.mock('../nats-client')

beforeAll(async () => {
  process.env.JWT_KEY = 'beerbill'

  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})

export const getCookie = async () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const session = JSON.stringify({ jwt: token })
  const base64 = Buffer.from(session).toString('base64')

  return [`session=${base64}`]
}
