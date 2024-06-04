'use client'

import GalleryCourseCard from "@/components/GalleryCourseCard";
import { useRetrieveCourseQuery } from "@/redux/features/courseApiSlice";
import React from "react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/common";
type Props = {};

const GalleryPage = (props: Props) => {
  const { data: course, isLoading, isError } = useRetrieveCourseQuery();
  console.log("course", course);
  console.log("id",course?.results)
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div> 
      )
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
        {Array.isArray(course?.results) && course?.results.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;




// 'use client'
// import React, { useState } from "react";
// import { useRetrieveCourseQuery } from "@/redux/features/courseApiSlice";
// import { redirect } from "next/navigation";
// import GalleryCourseCard from "@/components/GalleryCourseCard";
// import { Spinner } from "@/components/common";

// type Props = {};

// const GalleryPage = (props: Props) => {
//   const { data: courses, isLoading, isError } = useRetrieveCourseQuery();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   if (isLoading) {
//     return (
//       <div className="flex justify-center my-8">
//         <Spinner lg />
//       </div>
//     );
//   }
//   if (isError) {
//     console.error("Error fetching courses:", isError);
//     return <div>Error fetching courses. Please try again later.</div>;
//   }
//   if (!courses) {
//     return redirect("/gallery");
//   }

//   // Calculate pagination details
//   const totalItems = courses.length;
//   const totalPages = Math.ceil(totalItems/itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   return (
//     <div className="py-8 mx-auto max-w-7xl">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
//         {currentCourses.map((course) => (
//           <GalleryCourseCard course={course} key={course.id} />
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2 m-2 text-white bg-blue-500 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 m-2 text-white bg-blue-500 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GalleryPage;


