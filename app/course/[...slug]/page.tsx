"use client"
import React, { useEffect } from "react";
import CourseSideBar from "@/components/courseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import { useRetrieveCourseByIdQuery } from "@/redux/features/courseApiSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/common";

type Props = {
  params: {
    slug: any[];
  };
};

const CoursePage = ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const { data: course, isLoading, isError } = useRetrieveCourseByIdQuery(courseId);
  console.log("course",course)

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
      <Spinner lg />
    </div>
    );
  }

  if (isError) {
    console.error("Error fetching course:", isError);
    return <div>Error fetching course data. Please try again later.</div>;
  }

  if (!course) {
    return redirect("/gallery");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapter[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapter[chapterIndex + 1];
  const prevChapter = unit.chapter[chapterIndex - 1];

  return (
    <div className="flex flex-col md:flex-row w-full h-[800px] justify-between ">
       {/* {course?.name} */}
      <div className="w-full h-full overflow-auto mr-11 md:m-0 md:w-1/4">
        <CourseSideBar course={course} currentChapterId={chapter.id} />
      </div >
      <div className="w-full h-full overflow-auto mr-11 md:m-0 md:w-1/2">
        <div className="px-8">
          <div className="flex">
            <MainVideoSummary
              chapter={chapter}
              chapterIndex={chapterIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
            {/* <QuizCards chapter={chapter} /> */}
          </div>

          <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
          <div className="flex pb-8">
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                className="flex mt-4 mr-auto w-fit"
              >
                <div className="flex items-center">
                  <ChevronLeft className="w-6 h-6 mr-1" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">Previous</span>
                    <span className="text-xl font-bold">{prevChapter.name}</span>
                  </div>
                </div>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                className="flex mt-4 ml-auto w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">Next</span>
                    <span className="text-xl font-bold">{nextChapter.name}</span>
                  </div>
                  <ChevronRight className="w-6 h-6 ml-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full overflow-auto md:w-1/4 mr-11">
        <QuizCards chapter={chapter} />
      </div>
    </div>
)
}
export default CoursePage;


