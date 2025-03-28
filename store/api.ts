import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../lib/constants';
import { Product, ProductsResponse } from '@/types/products';
import { LoginResponse } from '@/types/user';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/products?page=${page}&limit=${limit}`,
      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        totalPages: response.totalPages,
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: '/users/sessions',
          method: 'POST',
          body: credentials,
        }),
        transformErrorResponse: (error) => {
          if (
            error &&
            typeof error === 'object' &&
            'data' in error &&
            error.data &&
            typeof error.data === 'object' &&
            'error' in error.data
          ) {
            return (error.data as { error: string }).error;
          }
          return 'Произошла неизвестная ошибка';
        },
      }
    ),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useLoginMutation } =
  api;
