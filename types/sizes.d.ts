export interface Size {
  _id: string;
  value: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SizeResponse {
  sizes: Size[];
  totalPages: number;
}
