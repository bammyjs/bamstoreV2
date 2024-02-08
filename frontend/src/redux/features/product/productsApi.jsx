import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers
const baseQuery = fetchBaseQuery({
  baseUrl: url,
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,

      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
    }),
    searchProducts: builder.query({
      // Add parameters as needed for search (e.g., query, category, brand)
      query: ({ query, category, brand }) =>
        `products?search=${query}&category=${category}&brand=${brand}`,
    }),
    sortProducts: builder.query({
      // Add parameters as needed for sorting (e.g., sortBy, sortOrder)
      query: ({ sortBy, sortOrder }) =>
        `products?sortBy=${sortBy}&sortOrder=${sortOrder}`,
    }),
    filterProductsByBrand: builder.query({
      // Add parameters as needed for filtering (e.g., brand)
      query: (brand) => `products?brand=${brand}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useSearchProductsQuery,
  useSortProductsQuery,
  useFilterProductsByBrandQuery,
} = productsApi;
