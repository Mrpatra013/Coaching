"use client"


import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useConstruct } from "@/hooks/use-construct";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "@/components/ui/progress";

interface iAppProps{
  data : EnrolledCourseType;
}

export function CourseProgressCard({data}: iAppProps){
  const thumbnail = useConstruct(data.course.fileKey);
  const {totalLessons, completedLessons, progressPercentage} = useCourseProgress({courseData: data.course as any });
  return(
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.course.level}</Badge>
      <Image width={600} height={400} className="w-full rounded-t-xl aspect-video h-full object-cover" src={thumbnail}  alt="Thumbnail" />
      

      <CardContent className="p-4">
        <Link className="font-semibold text-lg line-clamp-2  transition-colors"
        href={`/courses/${data.course.slug}`} >
          {data.course.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-tight mt-2">
          {data.course.smallDescription}
        </p>
        
        
          <div className="space-y-4 mt-5">
            <div className="flex justify-between mb-1 text-sm" >
              <p>Progress</p>
              <p className="font-medium" >{progressPercentage}%</p>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
            <p className="text-xs text-muted-foreground">{completedLessons}/{totalLessons} lesson completed</p>
          </div>

          <Link href={`/dashboard/${data.course.slug}`} className={buttonVariants({className:"w-full mt-4"})}>
            Start Learning
          </Link>
      </CardContent>
    </Card>
  );
}


export function PublicCourseSkeleton(){
  return(
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-xl aspect-video"/>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md"/>
            <Skeleton className="h-4 w-8"/>
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md"/>
            <Skeleton className="h-4 w-8"/>
          </div>
        </div>

        <Skeleton className="h-10 w-full mt-4 rounded-md" />
      </CardContent>
    </Card>
  );
}