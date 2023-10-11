/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { Stan } from 'node-nats-streaming'

import type { ESubjects } from './subjects'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
interface IEvent {
  subject: ESubjects
  data: any
}
/*----------------------------------------------------------------------------
Class
----------------------------------------------------------------------------*/
export abstract class Publisher<T extends IEvent> {
  abstract subject: T['subject']
  private client: Stan

  protected constructor(client: Stan) {
    this.client = client
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, data, (err) => {
        if (err) {
          return reject(err)
        }

        console.log('Event published to subject', this.subject)
        resolve()
      })
    })
  }
}
