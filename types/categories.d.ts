export interface Category {
  _id: string;
  name: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  categories: Category[];
  totalPages: number;
}
