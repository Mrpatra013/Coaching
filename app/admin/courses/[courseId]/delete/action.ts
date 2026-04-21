"use server"

import { ApiResponse } from "@/lib/type";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode:"LIVE",
    window:"1m",
    max:5,
  })
)

export async function deleteCourse(courseId: string):Promise<ApiResponse>{
  const session = await requireAdmin();


  try {
    
    const req = await request();
        const decision = await aj.protect(req,{
          fingerprint : session.user.id,
        });
    
        if (decision.isDenied()){
          if (decision.reason.isRateLimit()){
            return {
              status: 'error',
              message: 'You have been blocked due to rate Limiting .'
            };
          }else{
            return {
              status: 'error',
              message: 'You are a Bot ! if this is a mistake contact our support .'
            }
          }
        }

    await prisma.course.delete({
      where:{
        id: courseId,
      },
    });

    revalidatePath(`/admin/courses`)

    return {
      status: 'success',
      message: 'Course deleted successfully'
    }

  } catch{
    return{
      status: 'error',
      message: 'Failed to delete course'
    }
  }
}
