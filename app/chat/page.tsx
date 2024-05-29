'use client'
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/chatpdf/FileUpload";
// import { checkSubscription } from "@/lib/subscription";
// import SubscriptionButton from "@/components/SubscriptionButton";


export default function ChatHome() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            {/* <UserButton afterSignOutUrl="/" /> */}
          </div>
{/* 
          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div> */}

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuthenticated ? (
              <FileUpload />
            // <p>fileupload</p>
            ) : (
              <Link href="/dashboard">
                <Button>
                  profile page
                  {/* <LogIn className="w-4 h-4 ml-2" /> */}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}