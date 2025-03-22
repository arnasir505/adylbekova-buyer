export interface Color {
  _id: string;
  name: string;
  hex: string;
}

export interface Product {
  _id: string;
  brand: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  material: string;
  colors: Color[];
  sizes: string;
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
