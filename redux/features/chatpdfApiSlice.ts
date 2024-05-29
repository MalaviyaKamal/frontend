"use client"
import { apiSlice } from '../services/apiSlice';

interface Pdf {
    file: string;
}


const chatPdfApiSlice = apiSlice.injectEndpoints({
  
  endpoints: builder => ({
    
    uploadpdf:builder.mutation({
        query: ({ formData }) => ({
            url: '/chatpdf/upload/',
            method: 'POST',
            body: formData ,
        }),
    }),
    
  }),
});

export const {
  useUploadpdfMutation,
} = chatPdfApiSlice;
 


