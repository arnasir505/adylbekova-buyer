import { Color, Product, Size } from './products';

export type CartItem = {
  product: Product;
  quantity: number;
  size: Size;
  color: Color;
};

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  totalOriginalPrice: number;
  totalDiscount: number;
}
