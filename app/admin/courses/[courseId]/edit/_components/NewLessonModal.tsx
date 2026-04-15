import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { chapterSchema, ChapterSchemaType, lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createLesson } from "../action";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";

export function NewLessonModal({courseId,chapterId}: {courseId: string,chapterId: string}){
  const [isOpen, setIsOpen] = useState(false);
  const [pending , startTransition] = useTransition();

    const form = useForm<LessonSchemaType>({
      resolver: zodResolver(lessonSchema) as any,
      defaultValues: {
        name: "",
        courseId: courseId,
        chapterId: chapterId,
        description: "Placeholder description",
      },
    });

    async function onSubmit(values : LessonSchemaType){
      startTransition(async () => {
        const { data:result, error} = await tryCatch(createLesson(values));

        if(error){
          toast.error("An Unexpected error occured . Please try again later.")
          return;
        }

        if(result.status === "success"){
          toast.success(result.message);
          form.reset();
          setIsOpen(false);
        }else if(result.status === "error"){
          toast.error(result.message);
        }
      });
    }

  const handleOpenChange = (open: boolean) => {
    if(!open){
      form.reset();
    }
    setIsOpen(open);
  };

  return(
    <Dialog open={isOpen} onOpenChange={handleOpenChange} >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-center gap-2">
          <Plus className="size-4" /> New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
        <DialogDescription>
          Add a new lesson to your chapter.
        </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} >
            <FormField control={form.control} name="name" render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input  placeholder="lesson" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button disabled={pending} type="submit">
                {pending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}