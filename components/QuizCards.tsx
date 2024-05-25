import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  answer: string;
  options: string[]; 
}

interface Chapter {
  id: string;
  name: string;
  youtubeSearchQuery: string;
  videoId: string | null;
  summary: string | null;
  question: Question[]; 
}

type Props = {
  chapter: Chapter;
};

const QuizCards: React.FC<Props> = ({ chapter }) => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [questionState, setQuestionState] = React.useState<
    Record<string, boolean | null>
  >({});

  React.useEffect(() => {
    console.log("Chapter received:", chapter);
  }, [chapter]);

  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.question.forEach((question) => {
      const userAnswer = answers[question.id];
      if (!userAnswer) return;
      newQuestionState[question.id] = userAnswer === question.answer;
    });
    setQuestionState(newQuestionState);
  }, [answers, questionState, chapter.question]);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Concept Check</h1>
      <div className="mt-2">
        {chapter.question?.length > 0 ? (
          chapter.question.map((question) => {
            const options = question.options.slice(1, -1).split(/', '/).map(item => item.replace(/^'/, '').replace(/'$/, ''));
           return( <div
              key={question.id}
              className={cn("p-3 mt-4 border border-secondary rounded-lg", {
                "bg-green-700": questionState[question.id] === true,
                "bg-red-700": questionState[question.id] === false,
                "bg-secondary": questionState[question.id] === null,
              })}
            >
              <h1 className="text-lg font-semibold">{question.question}</h1>
              <div className="mt-2">
                <RadioGroup
                  onValueChange={(e: string) => {
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: e,
                    }));
                  }}
                >
                  {options&&options?.map((option, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem
                        value={option}
                        id={`${question.id}-${index}`}
                      />
                      <Label htmlFor={`${question.id}-${index}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
           );
})
        ) : (
          <div>No questions available.</div>
        )}
      </div>
      <Button className="w-full mt-2" size="lg" onClick={checkAnswer}>
        Check Answer
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default QuizCards;









// import React from "react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface Question {
//   id: string;
//   question: string;
//   answer: string;
//   options: any[];
// }

// interface Chapter {
//   id: string;
//   name: string;
//   youtubeSearchQuery: string;
//   videoId: string | null;
//   summary: string | null;
//   questions: Question[]; // Change to array of questions
// }

// type Props = {
//   chapter: Chapter;
// };

// const QuizCards: React.FC<Props> = ({ chapter }) => {
//   const [answers, setAnswers] = React.useState<Record<string, string>>({});
//   const [questionState, setQuestionState] = React.useState<
//     Record<string, boolean | null>
//   >({});

//   const arr = chapter.question[0].options.slice(1, -1).split(/', '/).map(item => item.replace(/^'/, '').replace(/'$/, ''));
//   console.log("mcq",arr );
//   const checkAnswer = React.useCallback(() => {
//     const newQuestionState = { ...questionState };
//     chapter.question.forEach((question) => {
//       const user_answer = answers[question.id];
//       if (!user_answer) return;
//       newQuestionState[question.id] = user_answer === question.answer;
//     });
//     setQuestionState(newQuestionState);
//   }, [answers, questionState, chapter.question]);

//   return (
//     <div className="flex-[1] mt-16 ml-8 mr-[-280px]">
//       <h1 className="text-2xl font-bold">Concept Check</h1>
//       <div className="mt-2">
//         {chapter.question?.map((question) => {
//           const options = question.options.slice(1, -1).split(/', '/).map(item => item.replace(/^'/, '').replace(/'$/, ''));;
//           // console.log("options mcq", JSON.parse(options)); // No need for JSON.parse, options is already an array
//           return (
//             <div
//               key={question.id}
//               className={cn("p-3 mt-4 border border-secondary rounded-lg", {
//                 "bg-green-700": questionState[question.id] === true,
//                 "bg-red-700": questionState[question.id] === false,
//                 "bg-secondary": questionState[question.id] === null,
//               })}
//             >
//               <h1 className="text-lg font-semibold">{question.question}</h1>
//               <div className="mt-2">
//                 <RadioGroup
//                   onValueChange={(e: string) => {
//                     setAnswers((prev) => ({
//                       ...prev,
//                       [question.id]: e,
//                     }));
//                   }}
//                 >
//                   {/* console.log("options:",JSON.parse( chapter.question.options)); */}
//                   {options &&
//                     options?.map((option, index) => (
//                       <div className="flex items-center space-x-2" key={index}>
//                         <RadioGroupItem
//                           value={option}
//                           id={`${question.id}-${index}`}
//                         />
//                         <Label htmlFor={`${question.id}-${index}`}>
//                           {option}
//                         </Label>
//                       </div>
//                     ))}
//                 </RadioGroup>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <Button className="w-full mt-2" size="lg" onClick={checkAnswer}>
//         Check Answer
//         <ChevronRight className="w-4 h-4 ml-1" />
//       </Button>
//     </div>
//   );
// };

// export default QuizCards;
