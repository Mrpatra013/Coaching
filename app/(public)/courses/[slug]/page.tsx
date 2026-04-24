import { getIndividualCourse } from "@/app/data/course/get-course";
import { userIsEnrolled } from "@/app/data/user/user-is-enrolled";
import { Badge } from "@/components/ui/badge";
import { useConstruct } from "@/hooks/use-construct";
import Image from "next/image";
import { ChartBar, CheckIcon, ChevronDown, Clock, School } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { IconBook, IconCategory, IconChartBar, IconClock, IconPlayerPlay } from "@tabler/icons-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { EnrollButton } from "./_components/EnrollButton";
import Link from "next/link";

type Params = Promise<{slug:string}>;

export default async function CourseDetailRoute({params}: {params:Params}){
  const {slug} = await params;
  const course = await getIndividualCourse(slug);
  // Derived server-side flag to switch CTA between enroll and watch.
  const isEnrolled = await userIsEnrolled(course.id);
  const thumbnail = useConstruct(course.fileKey);
  return(
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image src={thumbnail} alt="course Thumbnail" width={1280} height={720} className="object-cover priority" />

          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">{course.smallDescription}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-1 px-3 py-1">
              <ChartBar className="size-4" />
              <span>{course.level}</span>
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <School className="size-4" />
              <span>{course.category}</span>
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <Clock className="size-4" />
              <span>{course.duration}H</span>
            </Badge>
          </div>

          <Separator className="my-8 h-px w-full bg-gray-500" />

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">Course Description</h2>
              <RenderDescription json={JSON.parse(course.description)}/>
          </div>
        </div>



        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Content
            </h2>
            <div>
              {course.chapter.length} Chapters | {" "}
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,0
              ) || 0} Lessons
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-10">
          {course.chapter.map((chapter, index)=>(
            <Collapsible key={chapter.id} defaultOpen={index===0}>
              <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                <CollapsibleTrigger>
                  <div>
                    <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 ">
                          <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">{index + 1}</p>
                          <div >
                            <h3 className="text-xl font-semibold text-left">{chapter.title}</h3>
                            <p className="text-sm mt-1  text-muted-foreground text-left">
                              {" " + chapter.lessons.length} Lesson
                              {chapter.lessons.length !== 1? "s": ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {chapter.lessons.length} Lesson
                            {chapter.lessons.length !== 1? "s": ""}
                          </Badge>

                          <ChevronDown className="size-5 text-muted-foreground"/>
                        </div>


                      </div>
                    </CardContent>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-t bg-muted/20">
                    <div className="p-6 pt-4 space-y-3">
                      {chapter.lessons.map((lesson,lessonIndex)=>(
                        <div key={lesson.id} className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors group">
                          <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/60">
                            <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition colors"/>
                          </div>
                          
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {lesson.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>

              </Card>
            </Collapsible>
          ))}
        </div>
      </div>

      
      {/* Right Sidebar */}

      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Price :</span>
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("en-IN",{
                    style:"currency",
                    currency:"INR"
                  }).format(course.price)}
                </span>
              </div>

              <div className="space-y-4 mb-6 rounded-lg bg-muted p-4">
                <h4 className="font-medium">What you will get :</h4>
                <div className="flex flex-col gap-3">

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconClock className="size-4"/>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Duration</p>
                      <p className="text-xs text-muted-foreground">{course.duration}Hrs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconChartBar className="size-4"/>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Level</p>
                      <p className="text-xs text-muted-foreground">{course.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconCategory className="size-4"/>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-xs text-muted-foreground">{course.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconBook className="size-4"/>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Lessons</p>
                      <p className="text-xs text-muted-foreground">{course.chapter.reduce(
                        (total,chapter)=>total+chapter.lessons.length,0
                      ) || 0} Lessons</p>
                    </div>
                  </div>
                  
                </div>
              </div>


              <div className="mb-6 space-y-3">
                <h4>This Cours Includes</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-full p-1 bg-green-500/20 text-green-500">
                      <CheckIcon className="size-3" />
                    </div>
                    <span>Lifetime Access</span>
                  </li>

                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-full p-1 bg-green-500/20 text-green-500">
                      <CheckIcon className="size-3" />
                    </div>
                    <span>Access on Mobile & Desktop</span>
                  </li>

                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-full p-1 bg-green-500/20 text-green-500">
                      <CheckIcon className="size-3" />
                    </div>
                    <span>Free counseling after completion </span>
                  </li>
                </ul>
              </div>



              {isEnrolled ? (
                // Paid users jump directly to learning dashboard.
                <Link className={buttonVariants({className:"w-full"})} href="/dashboard">
                  Watch Course
                </Link>
              ) : (
                <EnrollButton courseId={course.id} courseName={course.title} />
              )}
              <p className="mt-3 text-xs text-muted-foreground text-center">Every penny will worth it.</p>


            </CardContent>
          </Card>
        </div>
      </div>



    </div>
  )
} 