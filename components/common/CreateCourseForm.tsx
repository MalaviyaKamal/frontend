"use client";
import { useCreateChaptersMutation } from "@/redux/features/authApiSlice";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { toast } from "react-toastify"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormControl, FormItem, FormLabel,FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from '@/components/common';
import SubscriptionAction from "./SubscriptionAction";

type Props = {isPro:boolean}
type InputData = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = ({isPro}:Props) => {
	const router = useRouter();
  const [createChapters, { isLoading }] = useCreateChaptersMutation();

  const form = useForm<InputData>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  const onSubmit = async (data: InputData) => {
    
  
    try {
      const response = await createChapters(data);
      if ('data' in response) {
        const { course_id } = response.data;
        toast.success(" successfully Course created")
        router.push(`/create/${course_id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    }
  };
  
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                <div className="flex flex-col w-[86%] gap-3">
                <FormControl className="flex-[6]">
                  <Input placeholder="Enter the main topic of the course" {...field} />
                </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <AnimatePresence>
            {form.watch("units").map((value: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ opacity: { duration: 0.2 }, height: { duration: 0.2 } }}
              >
                <FormField
                  key={index}
                  control={form.control}
                  name={`units.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                      <FormLabel className="flex-[1] text-xl">Unit {index + 1}</FormLabel>
                      <div className="flex flex-col w-[86%] gap-3">
                      <FormControl className="flex-[6]">
                        <Input placeholder="Enter subtopic of the course" {...field} />
                      </FormControl>
                      <FormMessage/>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => form.setValue("units", [...form.watch("units"), ""])}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => form.setValue("units", form.watch("units").slice(0, -1))}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full mt-6" size="lg">
					{isLoading ? <Spinner sm /> : `Let's Go!`}
          </Button>
        </form>
      </Form>
      {!isPro &&  <SubscriptionAction/>}
     
    </div>
  );
};

export default CreateCourseForm;
