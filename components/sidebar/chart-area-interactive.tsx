"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import React from "react"


export const description = "An interactive area chart"

const dummyEnrollmentData = [
  {
    date: "2026-04-15",
    enrollments: 12 ,
  },
  {
    date: "2026-04-16",
    enrollments: 18 ,
  },
  {
    date: "2026-04-17",
    enrollments: 32 ,
  },
  {
    date: "2026-04-18",
    enrollments: 12 ,
  },
  {
    date: "2026-04-19",
    enrollments: 2 ,
  },
  {
    date: "2026-04-20",
    enrollments: 12 ,
  },
  {
    date: "2026-04-21",
    enrollments: 16 ,
  },
  {
    date: "2026-04-22",
    enrollments: 31 ,
  },
  {
    date: "2026-04-23",
    enrollments: 19 ,
  },
  {
    date: "2026-04-24",
    enrollments: 1 ,
  },
  {
    date: "2026-04-25",
    enrollments: 10 ,
  },
  {
    date: "2026-04-26",
    enrollments: 42 ,
  },
  {
    date: "2026-04-27",
    enrollments: 2 ,
  }
]

const chartConfig = {
  
  enrollments:{
    label: 'Enrollments',
    color: "var(--chart-1)"
  }
} satisfies ChartConfig


interface ChartAreaInteractiveProps{
  data:{date:string; enrollments:number}[];
}


export function ChartAreaInteractive({data}:ChartAreaInteractiveProps) {
  
  const total = React.useMemo(
    ()=> data.reduce((acc,cur)=> acc+cur.enrollments,0),
    [data]
  );


  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
          Total Enrollments for the lat 30 days : {total}
        </span>
        <span className="@[540px]/card:hidden">
          Last 30 days: {total}
        </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full" >
          <BarChart data={data} margin={{left:12, right:12,}}>
            <CartesianGrid vertical={false } />
            <XAxis
            dataKey="date"
            tickLine = {false}
            axisLine = {false}
            tickMargin={8}
            interval={"preserveStartEnd"}
            tickFormatter={(value)=>{
              const date = new Date(value);
              return date.toLocaleDateString("en-IN",{
                month: "short",
                day: "numeric"
            });
            }}
            />

            <ChartTooltip content=
            {<ChartTooltipContent 
              className="w-37.5" 
              labelFormatter={(value)=>{
                const date = new Date(value);
                return date.toLocaleDateString("en-IN",{
                month: "short",
                day: "numeric" 
                });
            }}
            />
            }/>

            <Bar dataKey={"enrollments"} fill="var(--chart-1)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
