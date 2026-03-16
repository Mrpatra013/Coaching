import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import logo from "@/public/logo.png"

export default function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link href="/" className={buttonVariants({
        variant: "outline", 
        className: "absolute top-4 left-4"
      })} >
        <ArrowLeftIcon className="size-4" />Back
      </Link>

      <div className="flex w-full max-w-sm flex-col gap-6">
      <Link href="/" className="flex items-center gap-2 self-center font-bold ">
      <Image src={logo} alt="logo" width={32} height={32} />
      Pathshalaa .
      </Link>
      {children}

      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our <span className=" hover:underline text-blue-600">Terms of service </span>
        and <span className=" hover:underline text-blue-600">Privacy policy</span>
      </div>
    </div>
    </div>
  );


}
