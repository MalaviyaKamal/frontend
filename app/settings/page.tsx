'use client'
import SubscriptionButton from "@/components/common/SubscriptionButton";
import { useCheckSubscriptionQuery } from "@/redux/features/authApiSlice";
import React from "react";


const SettingsPage: React.FC = () => {
  const { data: apiResponse, error, isLoading } = useCheckSubscriptionQuery();
// console.log("resp",apiResponse)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching subscription:", error);
    return <div>Error fetching subscription</div>;
  }

  const isPro = apiResponse?.isValid || false;
  const nextBillingDate = apiResponse?.next_billing_date || '';

  return (
    <div className="py-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Settings</h1>
      {isPro ? (
        <p className="text-xl text-secondary-foreground/60">
          You are a pro user!
        </p>
      ) : (
        <p className="text-xl text-secondary-foreground/60">
          You are a free user
        </p>
      )}
      {nextBillingDate && (
        <p className="text-sm text-secondary-foreground/60">
          Next billing date: {nextBillingDate}
        </p>
      )}

      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
