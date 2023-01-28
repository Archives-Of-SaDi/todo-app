import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '@/models/post';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Post'],
  endpoints: build => ({
    getAllPosts: build.query<IPost[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getOnePost: build.query<IPost, number>({
      query: id => ({
        url: 'posts/' + id,
      }),
      providesTags: ['Post'],
    }),
    createOnePost: build.mutation({
      query: (post: IPost) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updateOnePost: build.mutation({
      query: (post: IPost) => ({
        url: 'posts/' + post.id,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteOnePost: build.mutation({
      query: (id: number) => ({
        url: 'posts/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useCreateOnePostMutation,
  useUpdateOnePostMutation,
  useDeleteOnePostMutation,
} = postApi;
