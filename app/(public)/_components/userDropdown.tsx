"use client"

import { BookOpen, HelpCircle, Home, LayoutDashboardIcon, LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import authClient from "@/lib/auth-client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"



export function Component(){
  const router = useRouter();

  async function signOut(){
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

  return(
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage alt="U" src="https://github.com/haydenbleasel.png" />
          <AvatarFallback>HB</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="w-46 mt-5">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-sm leading-none">Hayden Bleasel</span>
          <span className="text-muted-foreground text-xs leading-none">hello@haydenbleasel.com</span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
        <Link href="/">
          <Home />
        Home
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/courses">
          <BookOpen />
        Courses
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard">
          <LayoutDashboardIcon />
        Dashboard
        </Link>
      </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={signOut}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)}


