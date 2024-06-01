'use client';
import ChatSideBar from "@/components/chatpdf/ChatSiderBar";
import PDFViewer from "@/components/chatpdf/PDFViewer";
import { redirect } from "next/navigation";
import React from "react";
import { useChatsPdfQuery } from "@/redux/features/chatpdfApiSlice";

interface Chat {
    id: number;
    file: string;
    pdf_name: string;
};
  
type Props = {
    params: {
        chatId: string;
    };
};

const ChatPage = ({ params: { chatId } }: Props) => {
    const { data: chats, isLoading, error } = useChatsPdfQuery();
    console.log("data",chats)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log("error ",error)
        return <div>Error occured</div>; 
    }
    return (
        <div className="flex w-full h-full overflow-scroll">
            <div className="flex w-full h-full overflow-scroll">
                <div className="flex-[1] max-w-xs">
                    <ChatSideBar chats={chats}  chatId={parseInt(chatId)} />
                </div>
                <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
                    {/* <PDFViewer pdf_url={currentChat?.file || ""} /> */}
                </div>
                {/* <div className="flex-[3] border-l-4 border-l-slate-200">
                    <ChatComponent chatId={parseInt(chatId)} />
                </div> */}
            </div>
        </div>
    );
};

export default ChatPage;
