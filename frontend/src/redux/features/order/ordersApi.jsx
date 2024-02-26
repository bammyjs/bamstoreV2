import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers and credentials
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
