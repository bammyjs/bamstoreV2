import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// const getToken = () => {
//   console.log("Current cookies:", document.cookie);
//   const cookieString = document.cookie || "";
//   const tokenString = cookieString
//     .split("; ")
//     .find((row) => row.startsWith("token="));
//   const token = tokenString ? tokenString.split("=")[1] : null;
//   console.log("Retrieved token:", token);
//   return token;
// };

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
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = productsApi;
