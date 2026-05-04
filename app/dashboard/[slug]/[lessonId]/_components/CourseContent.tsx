"use client"

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstruct } from "@/hooks/use-construct";
import { BookIcon, CheckCircle } from "lucide-react";
import {  useTransition } from "react";
import { toast } from "sonner";
import { markLessonComplete } from "../action";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType
}

export function CourseContent({data}:iAppProps){

  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  
  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string
    videoKey: string
  }){
    const videoUrl = useConstruct(videoKey);
    const thumbnailUrl = useConstruct(thumbnailKey);

    if(!videoKey){
      return(
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
        <BookIcon className="size-16 text-muted-foreground mx-auto mb-4 " />
        <p className="text-muted-foreground">No video available</p>
      </div>
      )
    }

    return(
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video controls className="w-full h-full object-cover" poster={thumbnailUrl} >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  function onSubmit() {
      startTransition(async() =>{
        const { data:result, error } = await tryCatch(markLessonComplete(data.id, data.Chapter.Course.slug));
  
        if(error){
          toast.error("An unexpected error occured . please try again")
          return;
        }
  
        if(result.status === "success"){
          toast.success(result.message)
          triggerConfetti();
        }else if (result.status === "error"){
          toast.error(result.message)
        }
      })
    }

  return(
    <div className="flex flex-col h-full bg-background ">
      <VideoPlayer thumbnailKey={data.thumbnailKey ?? ""} videoKey={data.videoKey ?? ""} />
      <div className="py-4 border-b ">
        
        {data.lessonProgress.length > 0 ? (
          <Button variant="outline" className="bg-green-500/10 text-green-500 hover:text-green-500">
            <CheckCircle className="size-4 mr-2 text-green-500 " />
            Completed
          </Button>
        ):(
        <Button variant="outline" onClick={onSubmit} disabled={pending}>
          <CheckCircle className="size-4 mr-2 text-green-500" />
          Mark as Complete
        </Button> 
        )}
      </div>

      <div className="space-y-8 pt-3 ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{data.title}</h1>
        {data.description && (() => {
          try {
            const parsed = JSON.parse(data.description);
            return <RenderDescription json={parsed} />;
          } catch {
            return <p className="text-muted-foreground">{data.description}</p>;
          }
        })()}
      </div>

    </div>
  );
}

function triggerConfetti() {
  throw new Error("Function not implemented.");
}
