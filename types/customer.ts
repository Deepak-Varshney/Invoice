import { IPaymentOption } from './paymentOption';

export type ICustomer = {
    id: number;
    customer: ICustomer;
    items: {
      product: any;
      count: number;
    }[];
    created_at: number;
    payment_option: IPaymentOption;
  };
  