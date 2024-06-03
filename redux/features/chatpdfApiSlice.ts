"use client"
import { apiSlice } from '../services/apiSlice';

interface Pdf {
    file: string;
}
interface Chat {
  id: number;
  file: string;
  pdf_name: string;
};
const chatPdfApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadPdf: builder.mutation({
            query: ({ formData }) => ({
                url: '/chatpdf/upload/',
                method: 'POST',
                body: formData,
            }),
        }),
        createChat: builder.mutation({
            query: ({ formData }) => ({
                url: '/chatpdf/createchat/',
                method: 'POST',
                body: formData,
            }),
        }),
        chatsPdf: builder.query<Chat, void>({
            query: () => ({
                url: '/chatpdf/chat/',
                method: 'GET',
                
            })
        })
    }),
});

export const {
    useUploadPdfMutation,
    useCreateChatMutation,
    useChatsPdfQuery
} = chatPdfApiSlice;
