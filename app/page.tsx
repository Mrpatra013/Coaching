"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";

import authClient from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const {data: session} = authClient.useSession();

  async function signOut(){
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
      toast.success("Logout Successful");
    },
  },
});
  }

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-center text-red-500">Hello World</h1>
      <ModeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ):(
        <Button>Login</Button>
      )}
    </div>
  );
}
