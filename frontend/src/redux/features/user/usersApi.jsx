import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers
const baseQuery = fetchBaseQuery({
  baseUrl: url,
});

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery,

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (page = 1) => `users?pageNumber=${page}`,
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
