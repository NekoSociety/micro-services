/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { Message, Stan } from 'node-nats-streaming'

import type { ESubjects } from './subjects'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
interface IEvents {
  subject: ESubjects
  data: any
}

/*----------------------------------------------------------------------------
Class
----------------------------------------------------------------------------*/
export abstract class Listener<T extends IEvents> {
  abstract subject: T['subject']
  abstract queueGroupName: string
  abstract onMessage(data: T['data'], msg: Message): void
  private client: Stan
  protected ackWait = 5 * 1000

  protected constructor(client: Stan) {
    this.client = client
  }
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  listen() {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions())

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`)

      const parsedData = this.parseMessage(msg)
      this.onMessage(parsedData, msg)
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData()
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
  }
}
