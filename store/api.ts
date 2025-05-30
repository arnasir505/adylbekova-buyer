import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/constants';
import {
  Product,
  ProductFields,
  ProductFieldsWithID,
  ProductsResponse,
} from '@/types/products';
import { LoginResponse, User, UsersResponse } from '@/types/user';
import { Brand, BrandResponse } from '@/types/brands';
import { Category, CategoryResponse } from '@/types/categories';
import { Size, SizeResponse } from '@/types/sizes';
import { Color, ColorResponse } from '@/types/colors';
import { RootState } from '@/store';
import { unsetUser, updateState } from './user/userSlice';
import { Order, OrderFields } from '@/types/order';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.user?.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);

    if (refreshResult.data) {
      api.dispatch(updateState(refreshResult.data as LoginResponse));
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('user');
      api.dispatch(unsetUser());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        if (search) params.append('q', String(search));
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
    getUsers: builder.query<UsersResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        return `/users?${params.toString()}`;
      },
    }),
    getOrders: builder.query<Order[], void>({ query: () => '/orders' }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: '/users/sessions',
          method: 'POST',
          body: credentials,
        }),
      }
    ),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: '/users/logout', method: 'DELETE' }),
    }),
    createProduct: builder.mutation<Product, ProductFields>({
      query: (product) => {
        const formData = new FormData();
        formData.append('name', product.name);
        if (product.images) {
          for (const file of product.images) {
            formData.append('images', file);
          }
        }
        if (product.description) {
          formData.append('description', product.description);
        }
        formData.append('price', product.price);
        if (product.discount) {
          formData.append('discount', product.discount);
        }
        if (product.material) {
          formData.append('material', product.material);
        }
        for (const size of product.sizes) {
          formData.append('sizes', size);
        }
        for (const color of product.colors) {
          formData.append('colors', color);
        }
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        return {
          url: '/products',
          method: 'POST',
          body: formData,
        };
      },
    }),
    createBrand: builder.mutation<
      Brand,
      {
        name: string;
        description?: string;
        image?: File | null;
      }
    >({
      query: (brand) => {
        const formData = new FormData();
        formData.append('name', brand.name);
        if (brand.description) {
          formData.append('description', brand.description);
        }
        if (brand.image) {
          formData.append('image', brand.image);
        }
        return {
          url: '/brands',
          method: 'POST',
          body: formData,
        };
      },
    }),
    createCategory: builder.mutation<
      Category,
      {
        name: string;
        label: string;
      }
    >({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category,
      }),
    }),
    createSize: builder.mutation<
      Size,
      {
        value: string;
      }
    >({
      query: (size) => ({
        url: '/sizes',
        method: 'POST',
        body: size,
      }),
    }),
    createColor: builder.mutation<
      Color,
      {
        name: string;
        hex: string;
      }
    >({
      query: (color) => ({
        url: '/colors',
        method: 'POST',
        body: color,
      }),
    }),
    createUser: builder.mutation<
      User,
      { name: string; email: string; password: string; phone: string }
    >({
      query: (user) => ({ url: '/users/register', method: 'POST', body: user }),
    }),
    createOrder: builder.mutation<Order, OrderFields>({
      query: (orderFields) => ({
        url: '/orders',
        method: 'POST',
        body: orderFields,
      }),
    }),
    toggleBanUser: builder.mutation<User, string>({
      query: (id) => ({ url: `/users/toggle-ban/${id}`, method: 'PATCH' }),
    }),
    changeUserRole: builder.mutation<
      User,
      { userId: string; newRole: 'admin' | 'manager' }
    >({
      query: (arg) => ({
        url: `/users/change-role/${arg.userId}`,
        method: 'PATCH',
        body: { newRole: arg.newRole },
      }),
    }),
    updateProduct: builder.mutation<Product, ProductFieldsWithID>({
      query: (product) => {
        const formData = new FormData();
        formData.append('name', product.name);
        if (product.images) {
          for (const file of product.images) {
            formData.append('images', file);
          }
        }
        if (product.description) {
          formData.append('description', product.description);
        }
        formData.append('price', product.price);
        if (product.discount) {
          formData.append('discount', product.discount);
        }
        if (product.material) {
          formData.append('material', product.material);
        }
        for (const size of product.sizes) {
          formData.append('sizes', size);
        }
        for (const color of product.colors) {
          formData.append('colors', color);
        }
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        return {
          url: `/products/${product.id}`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
    toggleArchiveProduct: builder.mutation<Product, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'PATCH' }),
    }),
    updateBrand: builder.mutation<
      Brand,
      {
        name: string;
        description?: string;
        image?: File | null;
        id: string;
      }
    >({
      query: (brand) => {
        const formData = new FormData();
        formData.append('name', brand.name);
        if (brand.description) {
          formData.append('description', brand.description);
        }
        if (brand.image) {
          formData.append('image', brand.image);
        }
        return {
          url: `/brands/${brand.id}`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
    updateCategory: builder.mutation<
      Category,
      {
        id: string;
        name: string;
        label: string;
      }
    >({
      query: (category) => ({
        url: `/categories/${category.id}`,
        method: 'PUT',
        body: category,
      }),
    }),
    updateSize: builder.mutation<
      Size,
      {
        id: string;
        value: string;
      }
    >({
      query: (size) => ({
        url: `/sizes/${size.id}`,
        method: 'PUT',
        body: size,
      }),
    }),
    updateColor: builder.mutation<
      Color,
      {
        id: string;
        name: string;
        hex: string;
      }
    >({
      query: (color) => ({
        url: `/colors/${color.id}`,
        method: 'PUT',
        body: color,
      }),
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => {
        const params = new URLSearchParams();
        if (status) params.append('status', String(status));
        return {
          url: `/orders/status/${id}?${params.toString()}`,
          method: 'PATCH',
        };
      },
    }),
    updateOrderNotes: builder.mutation<Order, { id: string; notes: string }>({
      query: ({ id, notes }) => ({
        url: `/orders/notes/${id}`,
        method: 'PATCH',
        body: { notes },
      }),
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/users/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<
      { message: string },
      { token: string; newPassword: string }
    >({
      query: (body) => ({
        url: '/users/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetSizesQuery,
  useGetColorsQuery,
  useGetUsersQuery,
  useGetOrdersQuery,
  useCreateProductMutation,
  useCreateBrandMutation,
  useCreateCategoryMutation,
  useCreateSizeMutation,
  useCreateColorMutation,
  useCreateUserMutation,
  useCreateOrderMutation,
  useToggleBanUserMutation,
  useChangeUserRoleMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProductMutation,
  useToggleArchiveProductMutation,
  useUpdateBrandMutation,
  useUpdateCategoryMutation,
  useUpdateSizeMutation,
  useUpdateColorMutation,
  useUpdateOrderStatusMutation,
  useUpdateOrderNotesMutation,
  useDeleteProductMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = api;
