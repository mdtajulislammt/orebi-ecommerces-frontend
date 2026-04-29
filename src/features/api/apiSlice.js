import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create a generic API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001',
    prepareHeaders: (headers, { getState }) => {
      // Get token from state if it exists
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Product', 'Order', 'Review', 'Brand', 'Category'],
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
    getProduct: builder.query({
      query: (idOrSlug) => `/api/products/${idOrSlug}`,
      providesTags: (result, error, idOrSlug) => [{ type: 'Product', id: idOrSlug }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/api/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/products/${id}`,
        method: 'PATCH',
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

    // Reviews Endpoints
    addReview: builder.mutation({
      query: (data) => ({
        url: '/api/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review', 'Product'],
    }),
    getProductReviews: builder.query({
      query: (productId) => `/api/reviews/product/${productId}`,
      providesTags: (result, error, productId) => [{ type: 'Review', id: productId }],
    }),

    // Brand Endpoints
    getBrands: builder.query({
      query: () => '/api/brand/brands',
      providesTags: ['Brand'],
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: '/api/brand/brands',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Brand'],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/brand/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Brand'],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/api/brand/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brand'],
    }),

    // Categories Endpoints
    getCategories: builder.query({
      query: () => '/api/categories',
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/api/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
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
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddReviewMutation,
  useGetProductReviewsQuery,
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useBuyProductMutation,
  useGetMyOrdersQuery,
} = apiSlice;
