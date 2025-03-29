export interface Color {
  _id: string;
  name: string;
  hex: string;
}

export interface Size {
  _id: string;
  value: string;
}

export interface Brand {
  _id: string;
  name: string;
  imageName: string | null;
  imageUrl: string | null;
  description: string;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}

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
