"use client"

import slugify from "slugify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { courseSchema, CourseSchemaType, courseStatus, courseCategory, courseLevel } from "@/lib/zodSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon, SparkleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Editor } from "@/components/text-editor/Editor";
import { Uploader } from "@/components/filer-uploader/Uploader";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { CreateCourse } from "@/app/admin/courses/create/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function createCourse() {

  const [isPending , startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      category: "MATHEMATICS",
      level: "BEGINNER",
      smallDescription: "",
      slug: "",
      status: "DRAFT",
    },
  })

  function onSubmit(values: CourseSchemaType) {
    startTransition(async() =>{
      const { data:result, error } = await tryCatch(CreateCourse(values));

      if(error){
        toast.error("An unexpected error occured . please try again")
        return;
      }

      if(result.status === "success"){
        toast.success(result.message)
        form.reset()
        router.push("/admin/courses")
      }else if (result.status === "error"){
        toast.error(result.message)
      }
    })
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Create Course
        </h1>
        
        <Link href="/admin/courses" className="bg-primary text-white px-4 py-2 rounded-md">
          My Courses
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Provide basic information about the course.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form} >
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter course title" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
                
                <div className="flex gap-4 items-end ">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter course slug" />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <Button type="button" className="w-fit" onClick={()=>{
                      const titleValue = form.getValues("title") ;
                      const slug = slugify(titleValue)
                      form.setValue("slug", slug, {
                        shouldValidate: true,
                      })
                    }}>
                      Generate Slug <SparkleIcon className="ml-1" size={16} />
                    </Button>
                </div>

                <FormField
                    control={form.control}
                    name="smallDescription"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Small Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Enter course small description" className="min-h-30"/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>

                <FormField
                    control={form.control}
                    name="description"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Editor field={field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>

                <FormField
                    control={form.control}
                    name="fileKey"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Thumbnail Image</FormLabel>
                        <FormControl>
                          <Uploader onChange={field.onChange} value={field.value} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Level</FormLabel>
                        <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courseLevel.map((levelItem) => (
                                <SelectItem key={levelItem} value={levelItem}>
                                {levelItem}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}/>

                    <FormField
                    control={form.control}
                    name="category"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courseCategory.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}/>

                    <FormField
                    control={form.control}
                    name="duration"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Duration (hours)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Enter course duration in hours" />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>

                    <FormField
                    control={form.control}
                    name="price"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Enter course price" /> 
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                </div>

                <FormField
                    control={form.control}
                    name="status"
                    render={({field})=>(
                      <FormItem className="w-full">
                        <FormLabel>Status</FormLabel>
                        <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courseStatus.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}/>


                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                    creating...
                    <Loader2 className="animate-spin ml-1"/>
                    </>
                  ):(
                    <>
                    Create Course <PlusIcon className="ml-1" size={20} />
                    </>
                  )}  
                </Button>


            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}