import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../lib/constants';
import { Product, ProductsResponse } from '@/types/products';
import { LoginResponse } from '@/types/user';
import { BrandResponse } from '@/types/brands';
import { CategoryResponse } from '@/types/categories';
import { SizeResponse } from '@/types/sizes';
import { ColorResponse } from '@/types/colors';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        return `/products?${params.toString()}`;
      },
      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        totalPages: response.totalPages,
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
    getBrands: builder.query<BrandResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        return `/brands?${params.toString()}`;
      },
      transformResponse: (response: BrandResponse) => ({
        brands: response.brands,
        totalPages: response.totalPages,
      }),
    }),
    getCategories: builder.query<
      CategoryResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        return `/categories?${params.toString()}`;
      },
      transformResponse: (response: CategoryResponse) => ({
        categories: response.categories,
        totalPages: response.totalPages,
      }),
    }),
    getSizes: builder.query<SizeResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        return `/sizes?${params.toString()}`;
      },
      transformResponse: (response: SizeResponse) => ({
        sizes: response.sizes,
        totalPages: response.totalPages,
      }),
    }),
    getColors: builder.query<ColorResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        return `/colors?${params.toString()}`;
      },
      transformResponse: (response: ColorResponse) => ({
        colors: response.colors,
        totalPages: response.totalPages,
      }),
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

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLoginMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetSizesQuery,
  useGetColorsQuery,
} = api;
