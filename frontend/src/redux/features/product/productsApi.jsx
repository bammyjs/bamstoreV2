import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include", // Include cookies in requests
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Adjust this path to where your auth token is stored in state
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (searchQuery) => `products?search=${searchQuery}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,

      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productsApi;
