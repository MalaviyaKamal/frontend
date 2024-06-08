
"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useSubscriptionQuery } from "@/redux/features/subscriptionApiSlice";
import { Zap } from "lucide-react";
import { Spinner } from "./common";
import TermsModal from "./TermsModal";

type Props = {};

const SubscriptionAction = (props: Props) => {
  const { data: user, isLoading: userLoading, isError: userError }:any = useRetrieveUserQuery();
  const { data: subscriptionData, isLoading: subscriptionLoading, isError: subscriptionError }:any = useSubscriptionQuery();

  const [loading, setLoading] = React.useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = React.useState(false);

  const handleSubscribe = () => {
    setIsTermsModalOpen(true);
  };

  const handleAcceptTerms = () => {
    setLoading(true);
    setIsTermsModalOpen(false);
    try {
      console.log("response subscription", subscriptionData);
      if (subscriptionData && 'url' in subscriptionData) {
        window.location.href = subscriptionData.url;
      } else {
        console.log("Subscription data does not contain a URL");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (userLoading || subscriptionLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  if (userError || subscriptionError) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl p-6 mx-auto mt-8 rounded-lg shadow-md bg-slate-200">
    <div className="text-xl font-bold text-gray-800 mb-4">Subscription Plan</div> 
    <div className="text-2xl font-bold text-gray-800 mb-4">$20</div>
    <div className="mb-6"> 
      <ul className="list-disc list-inside text-gray-700">
        <li>Unlimited course generation</li>
        <li>Chat with PDF</li>
        <li>Early access to new features</li>
      </ul>
    </div>
    <div className="text-sm text-gray-600 mb-4">{user?.credits} / 10 Free Generations</div> 
    <Progress
      className="w-full mb-4 " 
      value={user?.credits ? (user?.credits / 10) * 100 : 0}
    /> 
    <Button
      disabled={loading}
      onClick={handleSubscribe}
      className="w-full font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 py-3 rounded-lg shadow-sm"
    >
      Upgrade
      <Zap className="fill-white ml-2" />
    </Button>
    <TermsModal
      isOpen={isTermsModalOpen}
      onClose={() => setIsTermsModalOpen(false)}
      onAccept={handleAcceptTerms}
    />
  </div>
  
  );
};

export default SubscriptionAction;
