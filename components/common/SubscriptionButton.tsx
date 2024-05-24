"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSubscriptionQuery } from "@/redux/features/authApiSlice";

type Props = { isPro: boolean };

const SubscriptionButton = ({ isPro }: Props) => {
  const { data: subscriptionData, isLoading: subscriptionLoading, isError: subscriptionError } = useSubscriptionQuery();

  const [loading, setLoading] = React.useState(false);
  const handleSubscribe = () => {
    setLoading(true);
    try {
      // console.log("response subscription", subscriptionData);
      if (subscriptionData?.url) {
        window.location.href = subscriptionData.url;
      }
    } catch (error) {
      console.log("billing error", error);
    } finally {
      setLoading(false);
    }
  };
  // if (subscriptionLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (subscriptionError) {
  //   return <div>Error occurred</div>;
  // }
  return (
    <Button className="mt-8" disabled={loading} onClick={handleSubscribe}>
      {isPro ? "Manage Subscriptions" : "Upgrade"}
    </Button>
  );
};

export default SubscriptionButton;