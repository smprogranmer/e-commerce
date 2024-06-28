import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}products` }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (category) => ({
        url: `?category=${category}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (data) => data.Products.reverse(),
      providesTags: (result, error) => {
        if (!error) {
          return ["Products"];
        }
      },
    }),

    ProductDetails: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error) => {
        if (!error) {
          return ["Products"];
        }
      },
    }),
    searchApi: builder.query({
      query: (searchTerm) => {
        console.log(searchTerm); // Log the searchTerm
        return {
          url: `/search-products/${searchTerm}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export default api;

export const { useGetProductsQuery, useProductDetailsQuery, useSearchApiQuery } = api;