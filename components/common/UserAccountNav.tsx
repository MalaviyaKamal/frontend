
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useRetrieveUserQuery,useLogoutMutation  } from '@/redux/features/authApiSlice';
import { Button } from '../ui/button';
import { logout as setLogout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Spinner } from '@/components/common';
import UserAvatar from './UserAvatar';


const UserAccountNav = () => {
  const { data: user, isLoading, isFetching, error } = useRetrieveUserQuery();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  
  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };
  if (isLoading || isFetching) {
    // console.log("error user",error)
    return (
        <div className='flex justify-center my-8'>
            <Spinner lg />
        </div>
    );
}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <Button>open Menu</Button> */}
       <UserAvatar/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.first_name && <p className="font-medium">{user.first_name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-secondary-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            handleLogout();
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
