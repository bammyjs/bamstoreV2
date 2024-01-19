import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1) => `products?pageNumber=${page}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,

      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
        headers: {
          // Include any additional headers here
          // Example: Authorization header for user login status
          Authorization: `Bearer ${token}`, // Replace with your actual access token
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = productsApi;
