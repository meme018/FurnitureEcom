import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://furnitureecom-1.onrender.com/",
  }),
  endpoints: (builder) => ({
    // get all products
    getProduct: builder.query({
      query: () => "/api/products",
    }),

    // get product by id
    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
    }),

    // add product
    postProduct: builder.mutation({
      query: (Product) => ({
        url: "/api/products",
        method: "POST",
        body: Product,
      }),
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ id, ...Product }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: Product,
      }),
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
