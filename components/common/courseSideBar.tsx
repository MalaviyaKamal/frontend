import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";

type Props = {
  course: Course & {
    units: (Units & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
};

interface Question {
  id: string;
  question: string;
  answer: string;
  options: string;
}

interface Chapter {
  id: string;
  name: string;
  youtubeSearchQuery: string;
  videoId: string | null;
  summary: string | null;
  question: Question[];
}

interface Units {
  id: string;
  name: string;
  chapter: Chapter[];
}

interface Course {
  id: string;
  name: string;
  image: string;
  user?: number | any;
  units: Units[] | any;
}

const CourseSideBar = ({ course, currentChapterId }: Props) => {
  return (
    <div className="left-0 overflow-y-auto bg-secondary" style={{width: "125rem",height:"100vh"}}>
      <div className="p-6">
        <h1 className="text-4xl font-bold">{course?.name}</h1>
        {course?.units.map((unit: any, unitIndex: any) => {
          return (
            <div key={unit.id} className="mt-4">
              <h2 className="text-sm uppercase text-secondary-foreground/60">
                Unit {unitIndex + 1}
              </h2>
              <h2 className="text-2xl font-bold">{unit.name}</h2>
              {unit.chapter.map((chapter: any, chapterIndex: any) => {
                return (
                  <div key={chapter.id}>
                    <Link
                      href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                      className={cn("text-secondary-foreground/60", {
                        "text-green-500 font-bold":
                          chapter.id === currentChapterId,
                      })}
                    >
                      {chapter.name}
                    </Link>
                  </div>
                );
              })}
              <Separator className="mt-2 text-gray-500 bg-gray-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSideBar;
