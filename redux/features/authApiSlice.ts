"use client"
import { apiSlice } from '../services/apiSlice';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  credits: string;
  image: string;
}

interface Input {
  title: string;
  units: string[];
}

interface Course {
  id: string;
  name:string,
  image:string,
  units:string[],
  chapters:string[],
  youtubeSearchQuery:string,
  videoId:string,
  summary:string
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    retrieveUser: builder.query<User, void>({
      query: () => '/current-user/',
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/jwt/create/',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({
        first_name,
        last_name,
        email,
        password,
        re_password,
      }) => ({
        url: '/users/',
        method: 'POST',
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: '/jwt/verify/',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
    }),
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: '/users/activation/',
        method: 'POST',
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation({
      query: email => ({
        url: '/users/reset_password/',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: '/users/reset_password_confirm/',
        method: 'POST',
        body: { uid, token, new_password, re_new_password },
      }),
    }),
    createChapters: builder.mutation({
      query: ({ title, units }: Input) => ({
        url: '/course/createchapter/',
        method: 'POST',
        body: { title, units },
      }),
    }),
    retrieveCourse: builder.query<Course, void>({
      query: () => '/course/courseget/',
    }),
    retrieveCourseById: builder.query<Course,void>({
      query: (courseId) => `/course/courseget/${courseId}/`,
    }),
    getChapterInfo: builder.mutation({
      query: ({ chapterId }: { chapterId: string }) => ({
        url: '/api/chapter/getInfo/',
        method: 'POST',
        body: { chapterId },
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useCreateChaptersMutation,
  useRetrieveCourseQuery,
  useRetrieveCourseByIdQuery,
  useGetChapterInfoMutation,
} = authApiSlice;
 

