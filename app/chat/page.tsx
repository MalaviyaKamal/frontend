'use client'
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/chatpdf/FileUpload";
import { useCheckSubscriptionQuery } from "@/redux/features/subscriptionApiSlice";
import { Spinner } from "@/components/common";
import SubscriptionAction from "@/components/SubscriptionAction";
import { useChatsPdfQuery } from "@/redux/features/chatpdfApiSlice";

type Props = { isPro: boolean }

export default function ChatHome() {
  const { data: chats, isLoading: chatLoad } = useChatsPdfQuery();
  const { data: apiResponse, error, isLoading } = useCheckSubscriptionQuery();

  if (isLoading || chatLoad) {
      return (
          <div className="flex justify-center my-8">
              <Spinner lg />
          </div>
      );
  }

  if (error) {
      console.error("Error fetching subscription:", error);
      return <div>Error fetching subscription</div>;
  }

  const isPro = apiResponse?.isValid || false;
  const firstChat = chats?.length > 0 ? chats[0] : null;

  return (
      <>
          <div className="w-full h-full bg-gradient-to-r mt-11">
              <div className="flex flex-col items-center text-center">
                  <div className="flex items-center">
                      <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
                  </div>
                  <div className="flex mt-2">
                      {firstChat && (
                          <Link href={`/chat/${firstChat.id}`}>
                              <Button>
                                  Go to Chats <ArrowRight className="ml-2" />
                              </Button>
                          </Link>
                      )}
                  </div>
                  <p className="max-w-xl mt-1 text-lg text-slate-600">
                      Join millions of students, researchers, and professionals to instantly
                      answer questions and understand research with AI.
                  </p>

                  <div className="w-[581px] mt-9">
                      <FileUpload />
                  </div>
              </div>
          </div>

          <div className="mt-24 mb-12">
              {!isPro && <SubscriptionAction />}
          </div>
      </>
  );
}