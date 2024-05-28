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


const authApiSlice = apiSlice.injectEndpoints({
  
  endpoints: builder => ({
    retrieveUser: builder.query<User, void>({
      query: () => '/user-profile/',
      providesTags: ["User"] 
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
    UpdateUser:builder.mutation({
      query:(formData)=>({
        url:'/user-profile/',
        method:'PATCH',
        body:formData,
        
      }),invalidatesTags:["User"]
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
    deleteUser:builder.mutation({
      query:()=>({
        url:'/user-profile/',
        method:'DELETE',
      })
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
    
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useVerifyMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation
} = authApiSlice;
 


