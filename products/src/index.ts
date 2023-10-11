/* ----------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------- */
import { DatabaseConnectionError } from '@nekosociety/common'
import mongoose from 'mongoose'

import 'express-async-errors'

import { app } from './app'
import { natsClient } from './nats-client'

/* ----------------------------------------------------------------------------
Server
---------------------------------------------------------------------------- */
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Secrets must be defined')
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined')
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined')
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined')
  }

  try {
    await natsClient.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    console.log('Connected to NATS')

    natsClient.client.on('close', () => {
      console.log('Gracefully closing NATS connection.')
      process.exit()
    })
    process.on('SIGINT', () => natsClient.client.close())
    process.on('SIGTERM', () => natsClient.client.close())
  } catch (err) {
    console.log(err)
    throw new Error('nats client error')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to mongodb')
  } catch (err) {
    throw new DatabaseConnectionError()
  }
}

app.listen(3000, () => {
  console.log(`Listening on port 3000`)
})

void start()
