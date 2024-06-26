"use client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Chapter {
  id: string;
  name: string;
  youtubeSearchQuery: string;
  videoId: string | null;
  summary: string | null;
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

const ConfirmChapters = ({ course }: { course: Course | undefined }) => {
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};

  // Create refs for each chapter
  course && course.units.forEach((unit: Units) => {
    unit && unit.chapter?.forEach((chapter: Chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });

  const [completedChapters, setCompletedChapters] = React.useState<any>(new Set());

  // Calculate total number of chapters
  const totalChaptersCount = React.useMemo(() => {
    return course?.units.reduce((acc: any, unit: Units) => {
      return acc + (unit.chapter ? unit.chapter.length : 0);
    }, 0) || 0;
  }, [course?.units]);

  // Trigger loading chapters sequentially
  const triggerLoadSequentially = async () => {
    setLoading(true);
    for (const ref of Object.values(chapterRefs)) {
      if (ref.current) {
        await ref.current.triggerLoad();
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full mt-4">
      {/* Render units and chapters */}
      {course?.units.map((unit: Units, unitIndex: number) => (
        <div key={unit.id} className="mt-5">
          <h2 className="text-sm uppercase text-secondary-foreground/60">Unit {unitIndex + 1}</h2>
          <h3 className="text-2xl font-bold">Unit {unitIndex + 1}: {unit.name}</h3>
          <div className="mt-3">
            {unit.chapter?.map((chapter: Chapter, chapterIndex: number) => (
              <ChapterCard
                completedChapters={completedChapters}
                setCompletedChapters={setCompletedChapters}
                ref={chapterRefs[chapter.id]}
                key={chapter.id}
                chapter={chapter}
                chapterIndex={chapterIndex}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link href="/create" className={buttonVariants({ variant: "secondary" })}>
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>
          {totalChaptersCount === completedChapters.size ? (
            <Link className={buttonVariants({ className: "ml-4 font-semibold" })} href={`/course/${course?.id}/0/0`}>
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Button
              type="button"
              className="ml-4 font-semibold"
              disabled={loading}
              onClick={triggerLoadSequentially}
            >
              {loading ? "Generating..." : "Generate"}
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
