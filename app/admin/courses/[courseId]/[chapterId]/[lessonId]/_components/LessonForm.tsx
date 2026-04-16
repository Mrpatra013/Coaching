"use client";

import { AdminGetLessonType } from "@/app/data/admin/admin-get-lesson";
import { Uploader } from "@/components/filer-uploader/Uploader";
import { Editor } from "@/components/text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { updateLesson } from "../action";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { useTransition } from "react";

interface iAppProps{
  data: AdminGetLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({chapterId, data, courseId}: iAppProps){

  const [pending , startTransition] = useTransition();

    const form = useForm<LessonSchemaType>({
      resolver: zodResolver(lessonSchema) as any,
      defaultValues: {
        name : data.title,
        chapterId: chapterId,
        courseId: courseId,
        description: data.description ?? undefined ,
        videoKey: data.videoKey ?? undefined,
        thumbnailKey: data.thumbnailKey ?? undefined,
      },
    });

      function onSubmit(values: LessonSchemaType) {
    startTransition(async() =>{
      const { data:result, error } = await tryCatch(updateLesson(values, data.id));

      if(error){
        toast.error("An unexpected error occured . please try again")
        return;
      }

      if(result.status === "success"){
        toast.success(result.message)
      }else if (result.status === "error"){
        toast.error(result.message)
      }
    });
  }
    
  return (
    <div>
      <Link className={buttonVariants({variant:"outline", className:"mb-6"})} href={`/admin/courses/${courseId}/edit`}>
        <ArrowLeft className="size-4" />
        <span>Go Back</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <CardDescription>
            Configure the video and the descvription for the lesson.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input placeholder="lesson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}/>

              <FormField control={form.control} name="description" render={({field})=>(
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Editor field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}/>

              <FormField control={form.control} name="thumbnailKey" render={({field})=>(
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Uploader  onChange={field.onChange}  value={field.value} fileTypeAccepted="image" />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}/>

              <FormField control={form.control} name="videoKey" render={({field})=>(
                <FormItem>
                  <FormLabel>Video</FormLabel>
                  <FormControl>
                    <Uploader  onChange={field.onChange}  value={field.value} fileTypeAccepted="video" />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}/>

              <Button disabled={pending} type="submit">
                {pending ? "Saving...." : "Save"}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}