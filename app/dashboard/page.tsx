'use client'
import React, { useState } from "react";
import { useRetrieveUserQuery, useDeleteUserMutation } from "@/redux/features/authApiSlice";
import { useCheckSubscriptionQuery } from "@/redux/features/subscriptionApiSlice";
import { List, Spinner } from "@/components/common";
import { useTheme } from "next-themes";
import SubscriptionAction from "@/components/SubscriptionAction";
import DeleteAccountModal from "@/components/forms/DeleteAccountModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import UpdateProfileModal from "@/components/forms/UpdateProfileModal";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

interface User {
  first_name?: string;
  last_name?: string;
  image?: string;
  email?: string;
  credits?: number;
}

export default function DashboardPage() {
  const { theme } = useTheme();
  const { data: user, isLoading, isFetching, error, refetch: refetchUser } = useRetrieveUserQuery();
  const { data: apiResponse, error: errorsub, isLoading: loadingsub, refetch: refetchSubscription } = useCheckSubscriptionQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // console.log("use data", user);

  if (isLoading || isFetching || loadingsub) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  if (errorsub) {
    // console.error("Error fetching subscription:", errorsub);
    return <div>Error fetching subscription</div>;
  }

  const isPro = apiResponse?.isValid || false;
  const nextBillingDate = apiResponse?.next_billing_date || "";

  const handleDeleteAccount = async () => {
    try {
      await deleteUser({});
      dispatch(setLogout());
      refetchSubscription();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleOpenUpdateProfileModal = () => {
    setUpdateProfileModalOpen(true);
  };

  const handleCloseUpdateProfileModal = () => {
    setUpdateProfileModalOpen(false);
  };

  // console.log("credits", user?.credits);
  const config = [
    { label: "Image", value: user?.image },
    { label: "First Name", value: user?.first_name },
    { label: "Last Name", value: user?.last_name },
    { label: "Email", value: user?.email },
    { label: "Credits", value: isPro ? "Unlimited" : (user?.credits !== undefined ? user.credits.toString() : "") },
    { label: "Subscription Status", value: isPro ? "Pro User" : "Free User" },
    isPro ? { label: "Next Billing Date", value: nextBillingDate } : null,
  ].filter((item): item is { label: string; value: string } => item !== null && item.value !== undefined);

  return (
    <>
      <header className={`max-w-7xl mx-auto shadow ${theme === "dark" ? "bg-slate-200" : "bg-gray-700"}`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
        <List config={config} />
        <Button onClick={handleOpenUpdateProfileModal} className="mt-4 bg-blue-600 text-white w-full">
          Update Profile
        </Button>
        <Button onClick={() => setDeleteModalOpen(true)} className="mt-4 bg-red-600 text-white w-full">
          Delete Account
        </Button>
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
        {user && (
          <UpdateProfileModal
            isOpen={isUpdateProfileModalOpen}
            onClose={handleCloseUpdateProfileModal}
            user={user}
          />
        )}
      </main>
      <div className="mx-auto max-w-7xl">{!isPro && <SubscriptionAction />}</div>
    </>
  );
}

