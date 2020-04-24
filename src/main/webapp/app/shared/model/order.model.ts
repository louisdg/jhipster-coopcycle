export interface IOrder {
  id?: number;
  orderId?: number;
}

export class Order implements IOrder {
  constructor(public id?: number, public orderId?: number) {}
}
