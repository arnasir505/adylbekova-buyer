import { Brand } from '@/types/brands';
import { Category } from '@/types/categories';
import { Color } from '@/types/colors';
import { Size } from '@/types/sizes';

export interface Product {
  _id: string;
  brand: Brand;
  name: string;
  category: Category;
  description: string;
  price: number;
  discount?: number;
  material: string;
  colors: Color[];
  sizes: Size[];
  imagesNames: string[];
  imagesUrl: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  totalPages: number;
}
