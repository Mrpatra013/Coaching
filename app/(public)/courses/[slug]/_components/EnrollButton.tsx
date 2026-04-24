"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { verifyPaymentAction } from "../verifyPayment";
import { useRouter } from "next/navigation";
import { enrollInCourseAction } from "../action";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Props {
  courseId: string;
  courseName: string;
}

export function EnrollButton({ courseId, courseName }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEnroll() {
    // Disable button immediately to avoid duplicate clicks/orders.
    setLoading(true);

    try {
      // Checkout script must be loaded before creating Razorpay instance.
      if (!window.Razorpay) {
        toast.error("Payment gateway is not loaded. Refresh and try again.");
        setLoading(false);
        return;
      }

      // Ask server to validate user/course and create a Razorpay order.
      const data = await enrollInCourseAction(courseId);

      // Server can return domain errors like "Already enrolled".
      if (data.status === "error") {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      // Configure Razorpay checkout popup with order/user details.
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Pathshalaa",
        description: `Enroll in - ${courseName}`,
        order_id: data.orderId,
        prefill: {
          name: data.userName,
          email: data.userEmail,
        },
        handler: async function (response: any) {
          // After successful payment, verify signature on server.
          const result = await verifyPaymentAction({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: data.courseId as string,
          });

          // On success: notify user and refresh page (shows enrolled state).
          if (result.status === "success") {
            setLoading(false);
            // Verified payment: send user to dedicated success screen.
            router.push("/payment/success");
          } else {
            // On verification failure: show safe error to user.
            setLoading(false);
            // Signature mismatch or server verification failure.
            router.push("/payment/cancel");
          }
        },
        readonly: {
          email: true,
        },
        modal: {
          backdropclose: false,
          confirm_close: true,
          escape: true,
          ondismiss: () => {
            setLoading(false);
            // User closed checkout without finishing payment.
            router.push("/payment/cancel");
          },
        },
        theme: {
          color: "#7c3aed",
        },
      };

      // Open Razorpay payment window.
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setLoading(false);
        // Razorpay emitted explicit payment failure event.
        router.push("/payment/cancel");
      });
      rzp.open();

    } catch (err) {
      // Catch unexpected client/runtime errors.
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Button
      className="w-full"
      onClick={handleEnroll}
      disabled={loading}
    >
      {loading ? "Processing..." : "Enroll Now !"}
    </Button>
  );
}