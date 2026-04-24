"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccess(){
  const {triggerConfetti} = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);


  return(
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="w-full flex justify-center">
            <CheckCircleIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full " />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">
              Payment Successful
            </h2>
            <p className="text-sm text-muted-foreground mt-2 ">
              Thank you for your purchase. You are now enrolled in the course.
            </p>
            <Link href="/dashboard" className={buttonVariants({className:"w-full mt-4"})}>
              <ArrowLeftIcon className="size-4" />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}