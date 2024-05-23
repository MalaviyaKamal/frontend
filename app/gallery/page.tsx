'use client'

import GalleryCourseCard from "@/components/common/GalleryCourseCard";
import { useRetrieveCourseQuery } from "@/redux/features/authApiSlice";
import React from "react";
import { redirect } from "next/navigation";

type Props = {};

const GalleryPage = (props: Props) => {
  const { data: course, isLoading, isError } = useRetrieveCourseQuery();
  console.log("course", course);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.error("Error fetching course:", isError);
    return <div>Error fetching course. Please try again later.</div>;
  }
  if (!course) {
    return redirect("/gallery");
  }
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {course?.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;






