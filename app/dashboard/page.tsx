"use client";
import React from "react";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import { useCheckSubscriptionQuery } from "@/redux/features/subscriptionApiSlice";
import { List, Spinner } from "@/components/common";
import SubscriptionButton from "@/components/SubscriptionButton";
import { useTheme } from 'next-themes'

export default function Page() {
  const { theme } = useTheme(); 

  const { data: user, isLoading, isFetching, error } = useRetrieveUserQuery();
  const {
    data: apiResponse,
    error: errorsub,
    isLoading: loadingsub,
  } = useCheckSubscriptionQuery();

  if (isLoading || isFetching || loadingsub) {
    // console.log("error user", error);
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }
  if (errorsub) {
    console.error("Error fetching subscription:", error);
    return <div>Error fetching subscription</div>;
  }
  const isPro = apiResponse?.isValid || false;
  const nextBillingDate = apiResponse?.next_billing_date || "";

  const config = [
    // {
    //   label: "id",
    //   value: user?.id,
    // },
    {
      label: "First Name",
      value: user?.first_name,
    },
    {
      label: "Last Name",
      value: user?.last_name,
    },

    {
      label: "Email",
      value: user?.email,
    },
    {
      label: "Credits",
      value: user?.credits,
    },
	{ label: "Subscription Status", value: isPro ? "Pro User" : "Free User" },
    { label: "Next Billing Date", value: nextBillingDate },
  ];

 
  return (
    <>
      <header className={` max-w-7xl mx-auto shadow ${theme === 'dark' ? 'bg-white' : 'bg-gray-700'}`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
        <List config={config} />
      </main>
     
 <div className="py-8 mx-auto max-w-7xl text-center">
        <SubscriptionButton isPro={isPro} />
      </div>
       
    </>
  );
}
