export interface Product {
  _id: string;
  brand: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  discount: number;
  material: string;
  colors: string[];
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
