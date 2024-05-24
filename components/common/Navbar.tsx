"use client";
import { useRouter, usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { NavLink } from "@/components/common";
import  UserAccountNav from '@/components/common/UserAccountNav'
import { ThemeToggle } from "./ThemeToggle";
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
//   const dispatch = useAppDispatch();

//   const [logout] = useLogoutMutation();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

//   const handleLogout = () => {
//     logout(undefined)
//       .unwrap()
//       .then(() => {
//         // Cookies.remove('token');
//         // Cookies.remove('access1');
//         dispatch(setLogout());
//       });
//   };

  const isSelected = (path: string) => (pathname === path ? true : false);

  const authLinks = (isMobile: boolean) => (
    <div className="flex flex-col sm:flex-row gap-6">
	 <NavLink href="/gallery" isMobile={isMobile} className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block">
        Gallery
      </NavLink>
      <NavLink href="/create" isMobile={isMobile} className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block">
        Create Course
      </NavLink>
      {/* <NavLink isMobile={isMobile} onClick={handleLogout} className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block">
        Logout
      </NavLink> */}
	   <NavLink isSelected={isSelected("/dashboard")} isMobile={isMobile} href="/dashboard" className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block">
	   {/* <NavLink  isMobile={isMobile} href="/dashboard " className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block"> */}
        {/* <img
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        /> */}
        dashboard
      </NavLink>
      <ThemeToggle className="mt-1.5 transition-all hover:-translate-y-[2px] md:block "/>
	    <UserAccountNav />
     
    </div>
  );

  const guestLinks = (isMobile: boolean) => (
    <div className="flex flex-row gap-6">
      <NavLink
        isSelected={isSelected("/auth/login")}
        isMobile={isMobile}
        href="/auth/login"
        className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block"
      >
        Login
      </NavLink>
      <NavLink
        isSelected={isSelected("/auth/register")}
        isMobile={isMobile}
        href="/auth/register"
        className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block"
      >
        Register
      </NavLink>
      <ThemeToggle className="mt-1.5 transition-all px-0 hover:-translate-y-[2px] md:block "/>

    </div>
  );

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="relative flex justify-center sm:justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="inline-block mx-auto sm:flex h-16 items-center justify-space ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-shrink-0 sm:absolute sm:left-0 items-center">
                <NavLink href="/" isBanner>
                  <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                    Learning Journey
                  </p>
                  {/* <div className='relative inset-0 grid-colo-6 justify-center items-center'>
    										<Image src={image1} alt='Learning Journey' className='w-24 h-14' />
										</div> */}
                </NavLink>
              </div>
              <div className="flex flex-1 sm:absolute sm:right-0 items-center justify-center space-x-3 sm:items-stretch sm:justify-end">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isAuthenticated ? authLinks(false) : guestLinks(false)}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {isAuthenticated ? authLinks(true) : guestLinks(true)}
            </div>
          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );
}
