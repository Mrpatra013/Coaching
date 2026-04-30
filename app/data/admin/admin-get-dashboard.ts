"use server-only"



import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats(){
  await requireAdmin();

  const [totalSignups , totalCustomers , totalCourses ,totalRevenue] = await Promise.all([

    //total Signups
    prisma.user.count(),


    //total customers
    prisma.user.count({
      where:{
        enrollments:{
          some:{},
        },
      },
    }),
    

    //total courses
    prisma.course.count(),

    //total Revenue 
    prisma.enrollment.aggregate({
      _sum:{
        amount: true,
      },
      where:{
        status: "Completed",
      },
    }),

  ]);


  return{
    totalSignups,
    totalCustomers,
    totalCourses,
    totalRevenue: totalRevenue._sum.amount ?? 0,
  }
}