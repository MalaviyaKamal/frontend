"use client";
// import { Chapter, Course, Unit } from "@prisma/client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


export interface Chapters {
    id: string;
    name: string;
    youtubeSearchQuery: string;
    videoId: string | null;
    summary: string | null;
}

interface Units {
    id: string;
    name: string;
    chapters: Chapters[];
}

interface Course {
    id: string;
    name: string;
    image: string;
    user?: number | any;
    units: Units[] | any;
}

const ConfirmChapters = ({ course }: {course:Course | undefined}) => {
    console.log("resp",course)
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course && course?.units.forEach((unit : Units) => {
    unit && unit?.chapter?.forEach((chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });

  console.log(chapterRefs)
  const [completedChapters, setCompletedChapters] = React.useState<Set<String>>(
    new Set()
  );
  const totalChaptersCount = React.useMemo(() => {
    return course?.units.reduce((acc: any, unit: Units) => {
        console.log("unit",unit.chapter)
      return acc + unit.chapter?.length;
    }, 0);
  }, [course?.units]);
//   console.log(course?.units[0].chapter);

  return (
    <div className="w-full mt-4">
      {course?.units.map((unit : Units, unitIndex:any) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">Unit {unitIndex + 1}:  {unit.name}</h3>
            <div className="mt-3">
                {unit.chapter?.map((chapter, chapterIndex) => {
                    return (
                        <ChapterCard
                            completedChapters={completedChapters}
                            setCompletedChapters={setCompletedChapters}
                            ref={chapterRefs[chapter.id]}
                            key={chapter.id}
                            chapter={chapter}
                            chapterIndex={chapterIndex}
                        />
                    );
                })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>
          {totalChaptersCount === completedChapters.size ? (
            <Link
              className={buttonVariants({
                className: "ml-4 font-semibold",
              })}
              href={`/course/${course?.id}/0/0`}
            >
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Button
              type="button"
              className="ml-4 font-semibold"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(chapterRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              Generate
              <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4} />
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
};

export default ConfirmChapters;