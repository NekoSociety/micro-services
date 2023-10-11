/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { Stan } from 'node-nats-streaming'
import { connect } from 'node-nats-streaming'

/*----------------------------------------------------------------------------
Class
----------------------------------------------------------------------------*/
class NatsClient {
  private _client?: Stan

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting')
    }

    return this._client
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = connect(clusterId, clientId, { url })

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        resolve()
      })

      this.client.on('error', (err) => {
        reject(err)
      })
    })
  }
}

export const natsClient = new NatsClient()
