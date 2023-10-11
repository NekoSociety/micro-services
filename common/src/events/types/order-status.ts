export enum EOrderStatus {
  /** The order has successfully reserved the product. */
  AwaitingPayment = 'awaiting:payment',
  /** The product the order is trying to reserve has already been reserved, or when the user has cancelled the order. */
  Cancelled = ' cancelled',
  /** The order has reserved the product and the user has provided payment successfully. */
  Complete = 'complete',
  /** When the order has been created, but the product it is trying to order has not been reserved. */
  Created = 'created',
  /** The order expired before payment. */
  Expired = 'expired',
}
