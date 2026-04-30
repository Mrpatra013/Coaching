
import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export async function  SectionCards() {
  const {totalSignups,totalCustomers,totalCourses,totalRevenue} = await adminGetDashboardStats()

  return (
    <div className="grid grid-cols-1 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue :</CardDescription>
          <CardTitle className="mt-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹ {totalRevenue}
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total revenue generated from this Platform .</p>
        </CardFooter>
      </Card>



      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers :</CardDescription>
          <CardTitle className="mt-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCustomers}
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Users who have enrolled in a course .</p>
        </CardFooter>
      </Card>
      


      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Signups :</CardDescription>
          <CardTitle className="mt-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSignups}
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total Users signed-in  .</p>         
        </CardFooter>
      </Card>

    <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Course :</CardDescription>
          <CardTitle className="mt-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCourses}
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total Courses in this platform .</p>
        </CardFooter>
      </Card>


    </div>
  )
}
