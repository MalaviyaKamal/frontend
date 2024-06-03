"use client";
// import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatsPdfQuery } from "@/redux/features/chatpdfApiSlice";
// import SubscriptionButton from "./SubscriptionButton";

interface Chat {
    id: number;
    file: string;
    pdf_name: string;
  };
  
type Props = {
  chats: Chat[] ;
  chatId: number;
//   isPro: boolean;
};

const ChatSideBar = ({ chats, chatId}: Props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="w-full h-full soff p-4 text-gray-200 bg-gray-900">
      <Link href="/chat">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex w-full h-full pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat?.pdf_name}
              </p>
            </div>
          </Link>
        ))}
      </div>

   
    </div>
  );
};

export default ChatSideBar;