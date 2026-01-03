import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://furnitureecom-1.onrender.com/",
  }),
  endpoints: (builder) => ({
    //register user
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/api/users",
        method: "POST",
        body: user,
      }),
    }),
    // login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
