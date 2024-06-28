import { ICustomer } from './customer';
import { IPaymentOption } from './paymentOption';

export type IInvoice = {
  id: number;
  customer: ICustomer;
  items: {
    product: any;
    count: number;
  }[];
  created_at: number;
  payment_option: IPaymentOption;
};
