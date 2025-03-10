import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../lib/constants';
import { ProductsResponse } from '@/types/products';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, {page: number, limit: number}>({
      query: ({ page, limit }) => `/products?page=${page}&limit=${limit}`,
      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        totalPages: response.totalPages,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = api;
