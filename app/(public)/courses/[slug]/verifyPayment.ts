"use server";

import crypto from "crypto";
import { prisma } from "@/lib/db";
import { requireUser } from "@/app/data/user/require-user";
import { env } from "@/lib/env";

export async function verifyPaymentAction({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  courseId,
}: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  courseId: string;
}) {
  // Verify payment only for logged-in user.
  const user = await requireUser();

  // Razorpay signature is generated from "order_id|payment_id".
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // Recreate signature using secret key and compare with gateway response.
  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return { status: "error", message: "Payment verification failed" };
  }

  // Load course amount from DB to avoid trusting any client-sent price.
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { price: true },
  });

  if (!course) {
    return { status: "error", message: "Course not found" };
  }

  // Mark enrollment as completed; upsert avoids duplicate row errors.
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    update: {
      status: "Completed",
      amount: course.price,
    },
    create: {
      userId: user.id,
      courseId,
      amount: course.price,
      status: "Completed",
    },
  });

  // Client uses this status to show success toast and refresh UI.
  return { status: "success" };
}