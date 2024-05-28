'use client'
import Link from 'next/link';
import image1 from '../public/images/learning_jorney.png'; // Adjusted image file name
import Image from 'next/image';
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";



export default function Page() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <main className='grid lg:grid-flow-col flex-row justify-between items-center h-screen gap-9'>
            <div className='relative inset-0 grid-colo-6 justify-center items-center'>
                <Image src={image1} alt='Learning Journey' className='max-w-full max-h-full' />
            </div>
            <div className='relative isolate px-6 pt-14 lg:px-8'>
                <div className='mx-auto max-w-2xl'>
                    <div className='text-center'>
                        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                            Full Auth Tutorial Application
                        </h1>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            This is an application meant to showcase JWT
                            authentication with Next.js and Django. Credentials
                            in this app get stored in cookies with the HttpOnly
                            flag for maximum security. Styling is done using
                            Tailwind.
                        </p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            {isAuthenticated ? (
                                <Link href='/gallery' passHref>
                                    <Button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                        Go to Gallery
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href='/auth/login' passHref>
                                        <Button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                            Log into your account
                                        </Button>
                                    </Link>
                                    <Link href='/auth/register' passHref>
                                        <Button className='text-sm font-semibold leading-6 text-gray-900'>
                                            Or create an account <span aria-hidden='true'>&rarr;</span>
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
