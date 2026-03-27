"use client";

import authClient from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useSignOut() {
  const router = useRouter();
  const handleSignOut = async function signOut(){
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
      toast.success("Logout Successful");
    },
    onError: () => {
      toast.error("Logout Failed");
    }
  },
});
  }
  return handleSignOut;
}