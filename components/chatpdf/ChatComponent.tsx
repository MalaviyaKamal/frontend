'use client'
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import MessageList from "@/components/chatpdf/MessageList";
import { useCreateChatMutation, useGetChatMessagesQuery } from "@/redux/features/chatpdfApiSlice";
import { toast } from "react-toastify";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingChat, setIsCreatingChat] = useState(false);

    const { data: getdata, isLoading: getLoading, error } = useGetChatMessagesQuery(chatId);
    const [createChat, { isLoading: isCreating }] = useCreateChatMutation();

    useEffect(() => {
        if (getdata) {
            setMessages(getdata);
        }
    }, [getdata]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!input.trim()) return;

        setIsCreatingChat(true);

        try {
            const { data } = await createChat({ chatId, question: { question: input } });
            setMessages([...messages, { question: input, response: data.response }]);
            setInput("");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message");
        } finally {
            setIsCreatingChat(false);
        }
    };

    useEffect(() => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <div className="relative w-full h-full" id="message-container">
          <div className="sticky top-0 inset-x-0 p-2 bg-gray-800 h-fit">
           <h3 className="text-xl  font-bold">Chat</h3>
          </div>
            <MessageList messages={messages} isLoading={isLoading} />

            <form onSubmit={handleSubmit} className="sticky bottom-0  inset-x-0 px-2 py-4 bg-gray-800">
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="TAsk any question..."
                        className="w-full"
                        disabled={isCreatingChat}
                    />
                    <Button type="submit" className="bg-blue-600 ml-2 ">
                        {isCreatingChat ? 'Sending...' : <Send className="h-4 w-4" />}
                                           
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;
