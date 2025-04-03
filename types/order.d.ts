import { User } from './user';
import { CartItem } from './cart';

export interface Order {
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
  products: CartItem[];
  totalPrice: number;
  totalItems: number;
  status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'canceled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderFields {
  firstName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  orderDetails?: string;
  products: {
    product: string;
    quantity: number;
    size: string;
    color: string;
  }[];
}
