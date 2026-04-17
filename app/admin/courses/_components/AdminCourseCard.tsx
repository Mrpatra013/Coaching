import { AminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstruct } from "@/hooks/use-construct";
import { ArrowRight, DeleteIcon, EyeIcon, MoreVertical, PencilIcon, School, TimerIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps{
  data: AminCourseType;
}

export function AdminCourseCard({data}:iAppProps) {
  const ThumbnailUrl = useConstruct(data.fileKey);
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <MoreVertical className="size-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">

            {/* Edit Course */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`} className="">
              <PencilIcon className="size-4 mr-2"/>
                Edit Course
              </Link>
            </DropdownMenuItem>

            {/* Preview Course */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.slug}`} >
              <EyeIcon className="size-4 mr-2"/>
                Preview
              </Link>
            </DropdownMenuItem>


            <DropdownMenuSeparator />

            {/* Delete Course */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`} className="">
              <Trash2 className="size-4 mr-2 text-red-500"/>
                Delete
              </Link>
            </DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image src={ThumbnailUrl} alt="Thumbnail"  width={600} height={400} className="w-full rounded-t-lg aspect-video h-full object-cover"/>
      <CardContent className="px-4 py-4">
        <Link href={`/admin/courses/${data.id}/edit`} className="font-bold text-2xl line-clamp-2 hover:underline group-hover:text-primary transition-colors">
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-4">{data.smallDescription}</p>



        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.duration} Hours</p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>

        <Link href={`/admin/courses/${data.id}/edit`} className={buttonVariants({
          className: "w-full mt-4"
        })}>
          Edit Course <ArrowRight className="size-4"/>
        </Link>
      </CardContent>
    </Card>
  )
}


export function AdminCourseCardSkeleton(){
  return(<Card className="group relative py-0 gap-0">
    <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
      <Skeleton className="h-6 w-16 rounded-full"/>
      <Skeleton className="size-8 rounded-md"/>
    </div>
    <div className="w-full relative h-fit">
      <Skeleton className="w-full rounded-t-lg aspect-video h-[250px] object-cover" />
    </div>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2 rounded" />
      <Skeleton className="h-4 w-10 rounded" />
      <div className="mt-4 flex items-center gap-x-5">
        <div className="flex items-center gap-x-2">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>
        <div className="flex items-center gap-x-2">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-10 rounded mt-4" />
    </CardContent>
  </Card>)
}