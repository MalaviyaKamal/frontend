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
interface Message{

  id: number;
  chat: number;
  content: string;
  role: "user" | "system"; 
  created_at: string; 

}
const chatPdfApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadPdf: builder.mutation({
            query: ({ formData }) => ({
                url: '/chatpdf/upload/',
                method: 'POST',
                body: formData,
            }),invalidatesTags:["User"]
        }),
        createChat: builder.mutation({
            query: ({chatId,question}) => ({
                url: `/chatpdf/ask/${chatId}/`,
                method: 'POST',
                body: question,
            }),invalidatesTags:["User"]
        }),
        getChatMessages:builder.query<Message,void>({
            query: (chatId) => ({
                url: `/chatpdf/messages/${chatId}/`,
            }),
            providesTags: ["User"] 
        }),
        chatsPdf: builder.query<Chat, void>({
            query: () => ({
                url: '/chatpdf/chat/',                
            }),
        })
    }),
});

export const {
    useUploadPdfMutation,
    useCreateChatMutation,
    useChatsPdfQuery,
    useGetChatMessagesQuery
} = chatPdfApiSlice;
