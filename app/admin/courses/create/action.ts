"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { headers } from "next/headers";

export async function CreateCourse(data: CourseSchemaType): Promise<ApiResponse>{
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const validation = courseSchema.safeParse(data);
    if(!validation.success){
      return {
        
        status: 'error',
        message: ' Invalid Form data'
      }
    } 

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string, 
      } 
    });


    return {
      status: 'success',
      message: 'Course Created'
    }
  } catch(error){
    console.log(error);
    return {
      status: 'error',
      message: 'Failed to create course'
    }
  }
}