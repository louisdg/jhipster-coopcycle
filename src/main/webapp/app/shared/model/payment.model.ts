import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';

export interface IPayment {
  id?: number;
  paymentMethod?: PaymentMethod;
}

export class Payment implements IPayment {
  constructor(public id?: number, public paymentMethod?: PaymentMethod) {}
}
