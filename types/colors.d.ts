export interface Color {
  _id: string;
  name: string;
  hex: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColorResponse {
  colors: Color[];
  totalPages: number;
}
