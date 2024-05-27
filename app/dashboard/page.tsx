"use client";

import React, { useState } from "react";
import { useRetrieveUserQuery, useDeleteUserMutation } from "@/redux/features/authApiSlice";
import { useCheckSubscriptionQuery } from "@/redux/features/subscriptionApiSlice";
import { List, Spinner } from "@/components/common";
import SubscriptionButton from "@/components/SubscriptionButton";
import { useTheme } from "next-themes";
import SubscriptionAction from "@/components/SubscriptionAction";
import UpdateProfile from "@/components/forms/UpdateProfile";
import DeleteAccountModal from "@/components/forms/DeleteAccountModal";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { theme } = useTheme();
  const { data: user, isLoading, isFetching, error } = useRetrieveUserQuery();
  const { data: apiResponse, error: errorsub, isLoading: loadingsub } = useCheckSubscriptionQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (isLoading || isFetching || loadingsub) {
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

  const handleDeleteAccount = () => {
    try {
      deleteUser();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const config = [
    { label: "Image", value: user?.image },
    { label: "First Name", value: user?.first_name },
    { label: "Last Name", value: user?.last_name },
    { label: "Email", value: user?.email },
    { label: "Credits", value: user?.credits },
    { label: "Subscription Status", value: isPro ? "Pro User" : "Free User" },
    isPro && { label: "Next Billing Date", value: nextBillingDate },
  ].filter(Boolean);

  return (
    <>
      <header className={`max-w-7xl mx-auto shadow ${theme === "dark" ? "bg-slate-200" : "bg-gray-700"}`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
        <List config={config} user={user}/>
        {/* <UpdateProfile user={user} config={config} /> */}
        <Button onClick={() => setDeleteModalOpen(true)} className="mt-4 bg-red-600 text-white w-full">
          Delete Account
        </Button>
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
      </main>
      <div className="mx-auto max-w-7xl">{!isPro && <SubscriptionAction />}</div>
    </>
  );
}
