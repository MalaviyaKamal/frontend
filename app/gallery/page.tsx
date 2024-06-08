// components/GalleryPage.tsx
'use client';

import GalleryCourseCard from "@/components/GalleryCourseCard";
import { useRetrieveCourseQuery } from "@/redux/features/courseApiSlice";
import React, { useState, useEffect, useCallback } from "react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/common";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

type Props = {};

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const GalleryPage = (props: Props) => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data: course, isLoading, isError }:any = useRetrieveCourseQuery({ search: debouncedSearch, page });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debounceSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 2000),
    []
  );

  useEffect(() => {
    debounceSearch(search);
  }, [search, debounceSearch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  // if (isError) {
  //   toast.error("not found course. Please try again later.");
  //   // console.error("Error fetching course:", isError);
  // }

  if (!course?.results?.length) {
    return (
      <div className="py-8 mx-auto max-w-7xl">
        <div className="flex justify-between mb-4">
          <input 
            type="text" 
            value={search} 
            onChange={handleSearchChange} 
            placeholder="Search courses" 
            className="px-4 py-2 border rounded"
          />
        </div>
        <div className="flex justify-center my-8">
          <p>No courses found for the search term</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="flex justify-between mb-4">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearchChange} 
          placeholder="Search courses" 
          className="px-4 py-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {Array.isArray(course?.results) && course?.results.map((course:any) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
      <div className="flex justify-center mt-4">
        <Button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={!course.previous}
          className="px-4 py-2 mx-2 border rounded"
        >
          Previous
        </Button>
        <Button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={!course.next}
          className="px-4 py-2 mx-2 border rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GalleryPage;

// 'use client';

// import GalleryCourseCard from "@/components/GalleryCourseCard";
// import { useRetrieveCourseQuery } from "@/redux/features/courseApiSlice";
// import React, { useState } from "react";
// import { redirect } from "next/navigation";
// import { Spinner } from "@/components/common";
// import { toast } from "react-toastify";

// type Props = {};

// const GalleryPage = (props: Props) => {
//   const [search, setSearch] = useState<string>('');
//   const [page, setPage] = useState<number>(1);

//   const { data: course, isLoading, isError } = useRetrieveCourseQuery({ search, page });
  
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center my-8">
//         <Spinner lg />
//       </div>
//     );
//   }

//   // if (isError) {
//   //   console.error("Error fetching course:", isError);
//   //   // return <div>Error fetching course. Please try again later.</div>;
//   // }

//   if (!course) {
//     return redirect("/gallery");
//   }

//   return (
//     <div className="py-8 mx-auto max-w-7xl">
//       <div className="flex justify-between mb-4">
//         <input 
//           type="text" 
//           value={search} 
//           onChange={handleSearchChange} 
//           placeholder="Search courses" 
//           className="px-4 py-2 border rounded"
//         />
//       </div>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
//         {Array.isArray(course?.results) && course?.results.map((course) => {
//           return <GalleryCourseCard course={course} key={course.id} />;
//         })}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button 
//           onClick={() => handlePageChange(page - 1)} 
//           disabled={!course.previous}
//           className="px-4 py-2 mx-2 border rounded"
//         >
//           Previous
//         </button>
//         <button 
//           onClick={() => handlePageChange(page + 1)} 
//           disabled={!course.next}
//           className="px-4 py-2 mx-2 border rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GalleryPage;

// import GalleryCourseCard from "@/components/GalleryCourseCard";
// import { useRetrieveCourseQuery } from "@/redux/features/courseApiSlice";
// import React from "react";
// import { redirect } from "next/navigation";
// import { Spinner } from "@/components/common";
// type Props = {};

// const GalleryPage = (props: Props) => {
//   const { data: course, isLoading, isError } = useRetrieveCourseQuery();
//   console.log("course", course);
//   console.log("id",course?.results)
//   if (isLoading) {
//     return (
//       <div className="flex justify-center my-8">
//         <Spinner lg />
//       </div> 
//       )
//        }
//   if (isError) {
//     console.error("Error fetching course:", isError);
//     return <div>Error fetching course. Please try again later.</div>;
//   }
//   if (!course) {
//     return redirect("/gallery");
//   }
//   return (
//     <div className="py-8 mx-auto max-w-7xl">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
//         {Array.isArray(course?.results) && course?.results.map((course) => {
//           return <GalleryCourseCard course={course} key={course.id} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default GalleryPage;



