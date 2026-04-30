"use server-only"



import { prisma } from "@/lib/db";

export async function getAllCourses(){
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const data = await prisma.course.findMany({
      where:{
        status : "PUBLISHED",
      },
      orderBy:{
        createdAt: "desc",
      },
      select:{
        title: true,
        price:true,
        smallDescription: true,
        category: true,
        slug: true,
        fileKey: true,
        id:true,
        level:true,
        duration:true,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export type PublicCourse = Awaited<ReturnType<typeof getAllCourses>>[0];