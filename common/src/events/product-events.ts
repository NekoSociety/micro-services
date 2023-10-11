/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { ESubjects } from './subjects'

/*----------------------------------------------------------------------------
Events
----------------------------------------------------------------------------*/
export interface IProductCreatedEvent {
  subject: ESubjects.ProductCreated
  data: {
    id: string
    title: string
    price: number
    userId: string
  }
}

export interface IProductUpdatedEvent {
  subject: ESubjects.ProductUpdated
  data: {
    id: string
    title: string
    price: number
    userId: string
  }
}
