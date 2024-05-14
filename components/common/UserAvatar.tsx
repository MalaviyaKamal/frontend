import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { Spinner } from '@/components/common';



const UserAvatar = () => {
    const { data: user, isLoading, isFetching, error } = useRetrieveUserQuery();


    if (isLoading || isFetching) {
        console.log("error user",error)
        return (
            <div className='flex justify-center my-8'>
                <Spinner lg />
            </div>
        );
    }
  return (
    <Avatar>
    {user && user.image ? (
        <div className="relative w-ful h-full aspect-square">
            <Image
                fill
                src={user.image}
                alt="user profile"
                referrerPolicy="no-referrer"
            />
        </div>
    ) : (
        <AvatarFallback>
            <span className="sr-only">{user?.first_name}</span>
        </AvatarFallback>
    )}
    </Avatar>
  );
};

export default UserAvatar;