"use client"

import { BookOpen, Home, LayoutDashboardIcon, LogOut,  } from "lucide-react"
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
import useSignOut from "@/hooks/use-signout"

interface iAppProps{
  name:string;
  email:string;
  image:string;
}



export function Component({name,email,image}:iAppProps){

  const handleSignOut = useSignOut();

  return(
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage src={image} alt={name}/>
          <AvatarFallback>{name && name.length > 0 ?name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="w-46 mt-5">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-sm leading-none">{name}</span>
          <span className="text-muted-foreground text-xs leading-none">{email}</span>
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
      <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)}


