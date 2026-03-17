"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authClient from "@/lib/auth-client";
import { GithubIcon, Loader, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm(){
  const router = useRouter();
  const [githubPending , startGithubTransition] = useTransition();
  const [emailPending , startEmailTransition] = useTransition();
  const [email , setEmail] = useState("");

  async function signInWithGitHub() {
    startGithubTransition (async() => {
      await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () =>{
          toast.success("Signed in successfully");
        },
        onError: (error) => {
          toast.error("Failed to sign in with GitHub");
        },
      },
    });
    })
  }
  
  function signInWithEmail() {
    startEmailTransition (async() => {
      await authClient.emailOtp.sendVerificationOtp({
        email:email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () =>{
            toast.success("Email Sent");
            router.push(`/verify-email?email=${email}`);
          },
          onError: () => {
            toast.error("error sending Email");
          },
        },
      });
    })
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button disabled={githubPending} onClick={signInWithGitHub} className="w-full" variant="outline">
        {githubPending ? (
          <>
            <Loader className = "size-4 animate-spin" />
            <span>Loading...</span>
          </>
        ):(
          <>
            <GithubIcon className="mr-2 h-4 w-4" />
            Login with GitHub
          </>
        )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">or continue with</span>
        </div>

        <div className="grid gap-3 ">
          <div className="grid gap-2 ">
            <Label htmlFor="email">Email </Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="abc@gmail.com" required />
          </div>

          <Button disabled={emailPending} onClick={signInWithEmail}>
            {emailPending ? (
              <>
                <Loader className = "size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ):(
              <>
                <Send className="size-4" />
                <span> Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
