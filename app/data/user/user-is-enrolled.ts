"use server-only"


import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function userIsEnrolled(courseId: string): Promise<boolean> {
  // Read current session on the server to identify the logged-in user.
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // Guests can never be enrolled.
  if(!session?.user){
    return false;
  }
  // Check enrollment status for this specific user-course pair.
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
    select: {
      status: true,
    },
  });

  // Only completed enrollment should unlock paid course access.
  return enrollment?.status === "Completed" ? true : false;
}
