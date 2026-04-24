"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { RazorPayInstance } from "@/lib/razorpay";

export async function enrollInCourseAction(courseId: string) {
  // Ensure only authenticated users can initiate payment.
  const user = await requireUser();

  try {
    // Fetch course pricing details required for creating Razorpay order.
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true },
    });

    if (!course) {
      return { status: "error" as const, message: "Course not found" };
    }

    // Prevent charging again if the user is already enrolled.
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (existing?.status === "Completed") {
      return { status: "error" as const, message: "Already enrolled" };
    }

    // Receipt is a short identifier attached to the Razorpay order.
    const receipt = `rcpt_${courseId.slice(0, 10)}_${user.id.slice(0, 10)}`;

    // Create payment order in paise (INR * 100) before opening checkout.
    const order = await RazorPayInstance.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt,
      notes: {
        courseId: course.id,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      },
    });

    // Send order details to client so Razorpay checkout can be opened.
    return {
      status: "success" as const,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseId,
      userName: user.name,
      userEmail: user.email,
    };
  } catch (error) {
    // Keep client-facing error generic but log actual server-side failure.
    const message =
      error instanceof Error ? error.message : "Unable to start payment";
    console.error("Razorpay order creation failed:", message);
    return { status: "error" as const, message: "Unable to start payment" };
  }
}
