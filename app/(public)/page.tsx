"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/themeToggle";

import authClient from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface featureProps{
  title:string;
  description:string;
  icon:string;
}

const features:featureProps[] = [
  {
    title:'Comprehensive Courses ',
    description:'Access a wide range of carefully curated courses designed by industry experts.',
    icon:'📚'
  },
  {
    title: 'Interactive Learning',
    description:'Engage with interactive content ,quizzes and assignments to enhance your learning experience.',
    icon: '🎮'
  },
  {
    title: ' Progress Tracking',
    description: 'Moniter your Progress and achievement with our detailed analytics and personalized dashboard.',
    icon: '📊'
  },
  {
    title: 'Community Support',
    description: 'Connect with a vibrant community of learners, share knowledge, and get help from peers.',
    icon: '👥'
  },
]

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
    <>
    <section className="relative py-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <Badge variant="outline">
          Home for your Education
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Elevate your Learning Experience</h1>
        <p className="max-w-162.5 text-muted-foreground md:text-xl text-sm">
          Discover a new way to learn with our modern, interactive learning platform. Access high-quality courses anytime, anywhere.
        </p>
        <div className="flex flex-cols sm:flex-row gap-4 mt-8">
          <Link className={buttonVariants({
            size:'lg',
          })} href="/courses">Explore Courses</Link>
          <Link className={buttonVariants({
            size:'lg',
            variant:'outline',

          })} href="/login">Sign in</Link>
        </div>
      </div>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature,index)=>(
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-4">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
    </>
  );
}
