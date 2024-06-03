'use client';
import ChatSideBar from "@/components/chatpdf/ChatSiderBar";
import PDFViewer from "@/components/chatpdf/PDFViewer";
import ChatComponent from "@/components/chatpdf/ChatComponent";
import React from "react";
import { useChatsPdfQuery } from "@/redux/features/chatpdfApiSlice";
import { redirect } from "next/navigation";

interface Chat {
  id: number;
  file: string;
  pdf_name: string;
  uploaded_at: string;
  user: number;
}

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = ({ params: { chatId } }: Props) => {
  const { data: chats, isLoading, error } = useChatsPdfQuery();

  console.log(chats)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error", error);
    return <div>Error occurred</div>; 
  }

  if (!chats || !chats.find((chat: Chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = chats.find((chat: Chat) => chat.id === parseInt(chatId));

  return (
    <div className="flex w-full h-screen">
        <div className="w-1/4 h-full overflow-y-scroll">
          <ChatSideBar chats={chats} chatId={parseInt(chatId)} />
        </div>
        <div className="w-1/2 h-full  overflow-hidden">
          <PDFViewer pdf_url={`http://127.0.0.1:8000/${currentChat.file}`} />
        </div>
        {/* Uncomment and adjust the following section if needed */}
        <div className="w-1/3 h-full border-l-4 overflow-y-scroll border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
    </div>
  );
};

export default ChatPage;
