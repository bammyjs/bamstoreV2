import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users/getUser",
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
