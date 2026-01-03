import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://furnitureecom-1.onrender.com/",
  }),
  endpoints: (builder) => ({
    // get all blogs
    getBlogs: builder.query({
      query: () => "/api/blogs",
    }),

    // get blog by id
    getBlogById: builder.query({
      query: (id) => `/api/blogs/${id}`,
    }),

    // add blog
    postBlog: builder.mutation({
      query: (blog) => ({
        url: "/api/blogs",
        method: "POST",
        body: blog,
      }),
    }),

    // update blog
    updateBlog: builder.mutation({
      query: ({ id, ...blog }) => ({
        url: `/api/blogs/${id}`,
        method: "PUT",
        body: blog,
      }),
    }),

    // delete blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
