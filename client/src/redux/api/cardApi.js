import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}cart`, credentials: "include" }),
  tagTypes: ["Cards"],
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Cards"],
    }),
    getCard: builder.query({
      query: (id) => ({
        url: `/cards/${id}`,
      }),
    }),
    createCard: builder.mutation({
      query: (card) => ({
        url: "/addToCard",
        method: "POST",
        body: card,
      }),
      providesTags: ['cards'],
      invalidatesTags: ['Cards'],
    }),
    updateCard: builder.mutation({
      query: (card) => {
        return {
          url: `/upgradeCart/${card.cartId}`,
          method: "PUT",
          body: card,
        };
      },
      providesTags: ["cards"],
      invalidatesTags: ["Cards"],
    }),
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cards"],
    }),
    deleteAllCards: builder.mutation({
      query: () => ({
        url: "/removeAllCart",
        method: "DELETE",
      }),
      invalidatesTags: ['Cards'],
    }),
  
  }),
});

export default cardApi;

export const {useGetCardsQuery,useDeleteAllCardsMutation,useCreateCardMutation,useDeleteCardMutation,useUpdateCardMutation } = cardApi;
