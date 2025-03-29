export interface Brand {
  _id: string;
  name: string;
  imageName: string | null;
  imageUrl: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse {
  brands: Brand[];
  totalPages: number;
}