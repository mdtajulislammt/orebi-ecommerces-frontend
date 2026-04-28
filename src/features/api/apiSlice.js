import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create a generic API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BACKEND_URL || 'http://localhost:5001' }),
  endpoints: (builder) => ({
    // For testing/demonstration purposes
    getDummyData: builder.query({
      query: () => '/dummy',
    }),
  }),
});

export const { useGetDummyDataQuery } = apiSlice;
