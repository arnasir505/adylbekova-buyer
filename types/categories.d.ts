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

export interface MenuItem {
  label: string;
  value: 'brand' | 'category';
  children: { label: string; value: string }[];
}
