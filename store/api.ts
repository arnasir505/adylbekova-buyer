import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../lib/constants';
import { Product } from '@/types/products';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetProductsQuery } = api;
