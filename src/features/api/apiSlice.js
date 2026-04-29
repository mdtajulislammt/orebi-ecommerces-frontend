import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create a generic API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BACKEND_URL || 'http://localhost:5001',
    prepareHeaders: (headers, { getState }) => {
      // Get token from state if it exists
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Product', 'Order'],
  endpoints: (builder) => ({
    // Auth Endpoints
    register: builder.mutation({
      query: (data) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query({
      query: () => '/api/auth/me',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/api/auth/update',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Products Endpoints
    getProducts: builder.query({
      query: (params) => ({
        url: '/api/products/all',
        params,
      }),
      providesTags: ['Product'],
    }),
    getProductBySlug: builder.query({
      query: (slug) => `/api/products/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Product', id: slug }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/api/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // Orders Endpoints
    buyProduct: builder.mutation({
      query: (data) => ({
        url: '/api/orders/buy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User', 'Order'],
    }),
    getMyOrders: builder.query({
      query: () => '/api/orders/my-orders',
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useBuyProductMutation,
  useGetMyOrdersQuery,
} = apiSlice;
