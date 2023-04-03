import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PATH = 'https://blog.kata.academy/api/';

export const getApi = createApi({
  reducerPath: 'getApi',
  baseQuery: fetchBaseQuery({ baseUrl: PATH }),
  endpoints: (builder) => ({
    getFullPost: builder.query({
      query: (slug) => `articles/${slug}`,
    }),
    addNewUser: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddNewUserMutation, useGetFullPostQuery } = getApi;
