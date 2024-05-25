
'use client'
import React from "react";
import { InfoIcon } from "lucide-react";
import { Spinner } from "@/components/common";
import CreateCourseForm from "@/components/CreateCourseForm";
import { useCheckSubscriptionQuery } from "@/redux/features/subscriptionApiSlice";

type Props = {};

const CreatePage = (props: Props) => {
  const { data: apiResponse, error, isLoading } = useCheckSubscriptionQuery();
  // console.log("resp",apiResponse)
    if (isLoading) {
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
    const nextBillingDate = apiResponse?.next_billing_date || '';
  
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-4xl">
        Learning Journey
      </h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          Enter in a course title, or what you want to learn about. Then enter a
          list of units, which are the specifics you want to learn. And our AI
          will generate a course for you!
        </div>
      </div>

    
      <CreateCourseForm isPro={isPro} />
    </div>
  );
};

export default CreatePage;