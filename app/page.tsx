"use client";
import Link from "next/link";
import image1 from "../public/images/website_photo.jpeg"; 
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <main className="w-full flex flex-col lg:flex-row items-center h-screen gap-9">
      <div className="w-1/2 flex inset-0 justify-center items-center">
        <Image
          src={image1}
          alt="Learning Journey"
          className="max-w-full h-full"
        />
      </div>
      <div className="w-1/2 flex inset-0 justify-center items-center">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-500 sm:text-6xl">
              <span className="inline-block">
                {Array.from("Learning Journey").map((char, index) => (
                  <span key={index} className="inline-block animate-pulse ">
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Embark on a seamless learning journey with our innovative
              platform! Simply input your course name and unit, and watch as we
              automatically generate chapters tailored to your curriculum. With
              just a click, transform each chapter into engaging videos,
              insightful MCQs, and concise summaries. Plus, experience the power
              of interactive learning through our unique chat feature, where you
              can upload PDFs and create dynamic conversations. Elevate your
              learning experience with us today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isAuthenticated ? (
                <>
                  <Link href="/create" passHref>
                    <Button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Go to createcourse
                    </Button>
                  </Link>
                  <Link href="/chat" passHref>
                    <Button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Go to chat
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" passHref>
                    <Button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Log into your account
                    </Button>
                  </Link>
                  <Link href="/auth/register" passHref>
                    <Button className="text-sm font-semibold leading-6 bg-indigo-600">
                      Or create an account{" "}
                      <span aria-hidden="true">&rarr;</span>
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
