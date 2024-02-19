import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers and credentials
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include", // Include cookies in requests
  prepareHeaders: (headers, { getState }) => {
    // If you have other headers to set, do it here. For cookie-based auth, this may not be necessary.
    return headers;
  },
});

export const ordersApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "order",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrders: builder.query({
      query: () => "order",
    }),
    getOrder: builder.query({
      query: (id) => `order/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
