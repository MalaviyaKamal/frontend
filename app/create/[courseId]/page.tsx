
"use client";

import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { useRetrieveCourseByIdQuery } from "@/redux/features/courseApiSlice";
import { toast } from "react-toastify";
import ConfirmChapters from "@/components/confirmChapters";
import { Spinner } from "@/components/common";

type Props = {
  params: {
    courseId: any;
  };
};

const CreateChapters = ({ params: { courseId } }: Props) => {
  const { data: course, isLoading, error } = useRetrieveCourseByIdQuery(courseId);
  // const [toastShown, setToastShown] = useState(false);
// console.log(course)
//   useEffect(() => {
//     if (error && !toastShown) {
//       toast.error(`Error: ${error}`);
//       setToastShown(true);
//     }
//   }, [error, toastShown]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  if (error){
    const errorMessage = "chapter is not generated";
      toast.error(errorMessage);
  }

  // if (!course) {
  //   redirect("/create");
  //   return null; // Return null to avoid rendering any content while redirecting
  // }

  return (
    <div className="flex flex-col items-start max-w-xl mx-auto my-16">
      <h5 className="text-sm uppercase text-seconday-foreground/60">
        Course Name
      </h5>

      <div>
        <h1 className="text-5xl font-bold">{course?.name}</h1>
      </div>

      <div className="flex p-4 mt-5 border-none bg-secondary">
        <Info className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          We generated chapters for each of your units. Look over them and then
          click the Button to confirm and continue
        </div>
      </div>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default CreateChapters;
