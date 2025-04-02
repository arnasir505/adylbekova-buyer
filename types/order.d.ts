import { CartState } from './cart';
import { User } from './user';

export interface Order extends CartState {
  _id: string;
  manager: User;
  orderNumber: string;
  firstName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  orderDetails?: string;
  notes?: string;
  status:
    | 'pending'
    | 'paid'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'canceled';
  createdAt?: Date;
  updatedAt?: Date;
}
