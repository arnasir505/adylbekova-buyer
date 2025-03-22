import { Product } from './products';

export type CartItem = { product: Product; quantity: number };

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}
