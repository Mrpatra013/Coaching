"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import authClient from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmail(){
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending , startEmailTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const isOtpCompleted = otp.length === 6;
  
  function verifyOtp(){
    startEmailTransition(async () =>{
      
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () =>{
            toast.success("Email Verified");
            router.push(`/`);
          },
          onError: () => {
            toast.error("Error verifying email");
          },
        },
      })
    })
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl ">Please Check your Email</CardTitle>
        <CardDescription>We have ent a verification code to your email address.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP value={otp} onChange={(value)=>setOtp(value)} maxLength={6} className="gap-2">
          <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          </InputOTPGroup>
            <span>--</span>
          <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code</p>
        </div>
        <Button onClick={verifyOtp} className="w-full" disabled={emailPending || !isOtpCompleted}>
          {emailPending ?(
            <>
              <Loader2 className="animate-spin size-4" />
              <span className="ml-2">Verifying...</span>
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
