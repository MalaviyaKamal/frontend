// "use client";
// // import { useSession } from "next-auth/react";
// import React from "react";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { useRetrieveUserQuery, useSubscriptionQuery } from "@/redux/features/authApiSlice";
// import { Zap } from "lucide-react";
// import axios from "axios";
// import { redirect } from "next/navigation";
// type Props = {};

// const SubscriptionAction = (props: Props) => {
// //   const { data } = useSession();
//   const { data: user, isLoading,isError } = useRetrieveUserQuery();
//   const [loading, setLoading] = React.useState(false);
//   const handleSubscribe = () => {
//     setLoading(true);
//     try {
//       const { data: response, isLoading,isError} = useSubscriptionQuery();
//       console.log("response subscription", response);
    
//       window.location.href = response?.url;
//     } catch (error) {
//       console.log("error", error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
//       {user?.credits} / 10 Free Generations
//       <Progress
//         className="mt-2"
//         value={user?.credits ? (user?.credits / 10) * 100 : 0}
//       />
//       <Button
//         disabled={loading}
//         onClick={handleSubscribe}
//         className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
//       >
//         Upgrade
//         <Zap className="fill-white ml-2" />
//       </Button>
//     </div>
//   );
// };

// export default SubscriptionAction;

"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRetrieveUserQuery, useSubscriptionQuery } from "@/redux/features/authApiSlice";
import { Zap } from "lucide-react";

type Props = {};

const SubscriptionAction = (props: Props) => {
  const { data: user, isLoading: userLoading, isError: userError } = useRetrieveUserQuery();
  const { data: subscriptionData, isLoading: subscriptionLoading, isError: subscriptionError } = useSubscriptionQuery();
  
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    try {
      console.log("response subscription", subscriptionData);
      if (subscriptionData?.url) {
        window.location.href = subscriptionData.url;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || subscriptionLoading) {
    return <div>Loading...</div>;
  }

  if (userError || subscriptionError) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
      {user?.credits} / 10 Free Generations
      <Progress
        className="mt-2"
        value={user?.credits ? (user?.credits / 10) * 100 : 0}
      />
      <Button
        disabled={loading}
        onClick={handleSubscribe}
        className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
      >
        Upgrade
        <Zap className="fill-white ml-2" />
      </Button>
    </div>
  );
};

export default SubscriptionAction;
