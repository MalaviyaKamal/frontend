
"use client";
import { cn } from "@/lib/utils";
// import { useToast } from "@/components/ui/use-toast";
import {toast} from "react-toastify"
import { Loader2 } from "lucide-react";
import { Chapter } from "./confirmChapters"; 
import React from "react";
import { useGetChapterInfoMutation } from "@/redux/features/courseApiSlice"; 

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => Promise<void>;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
    // const { toast } = useToast();
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const [getChapterInfo, { isLoading }] = useGetChapterInfoMutation();

    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        try {
          const response = await getChapterInfo({ chapterId: chapter.id });
          if ('data' in response) {
            const { data } = response;
            setSuccess(true);
            addChapterIdToSet();
          } else {
            const { error } = response;
            console.error(error);
            setSuccess(false);''
            toast.error("There was an error loading your chapter");
            addChapterIdToSet();
          }
        } catch (error) {
          console.error(error);
          setSuccess(false);
          toast.error("There was an error loading your chapter");
          addChapterIdToSet();
        }
      },
    }));

    return (
      <div
        key={chapter.id}
        className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
          "bg-secondary": success === null,
          "bg-red-500": success === false,
          "bg-green-500": success === true,
        })}
      >
        <h5>{chapter.name}</h5>
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;

// "use client";
// import { cn } from "@/lib/utils";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader2 } from "lucide-react";
// import { Chapters } from "./confirmChapters"; 
// import React from "react";
// import { useGetChapterInfoMutation } from "@/redux/features/authApiSlice"; 

// type Props = {
//   chapter: Chapters;
//   chapterIndex: number;
//   completedChapters: Set<String>;
//   setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
// };

// export type ChapterCardHandler = {
//   triggerLoad: () => void;
// };

// const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
//   ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
//     const { toast } = useToast();
//     const [success, setSuccess] = React.useState<boolean | null>(null);
//     // Using the generated mutation hook from the store
//     const [getChapterInfo, { isLoading }] = useGetChapterInfoMutation();

//     const addChapterIdToSet = React.useCallback(() => {
//       setCompletedChapters((prev) => {
//         const newSet = new Set(prev);
//         newSet.add(chapter.id);
//         return newSet;
//       });
//     }, [chapter.id, setCompletedChapters]);

//     React.useEffect(() => {
//       if (chapter.videoId) {
//         setSuccess(true);
//         addChapterIdToSet();
//       }
//     }, [chapter, addChapterIdToSet]);

//     React.useImperativeHandle(ref, () => ({
//       async triggerLoad() {
//         if (chapter.videoId) {
//           addChapterIdToSet();
//           return;
//         }
//         try {
//           // Call the mutation hook to fetch chapter info
//           const response = await getChapterInfo({ chapterId: chapter.id });
//           if ('data' in response) {
//             const { data:any } = response;
//             setSuccess(true);
//             addChapterIdToSet();
//           } else {
//             const { error } = response;
//             console.error(error);
//             setSuccess(false);
//             toast({
//               title: "Error",
//               description: "There was an error loading your chapter",
//               variant: "destructive",
//             });
//             addChapterIdToSet();
//           }
//         } catch (error) {
//           console.error(error);
//           setSuccess(false);
//           toast({
//             title: "Error",
//             description: "There was an error loading your chapter",
//             variant: "destructive",
//           });
//           addChapterIdToSet();
//         }
//       },
//     }));

//     return (
//       <div
//         key={chapter.id}
//         className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
//           "bg-secondary": success === null,
//           "bg-red-500": success === false,
//           "bg-green-500": success === true,
//         })}
//       >
//         <h5>{chapter.name}</h5>
//         {/* Display loader based on isLoading */}
//         {isLoading && <Loader2 className="animate-spin" />}
//       </div>
//     );
//   }
// );

// ChapterCard.displayName = "ChapterCard";

// export default ChapterCard;
