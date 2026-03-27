import Link from "next/link";

export default function Courses() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Your Courses
        </h1>
        <Link href="/admin/courses/create" className="bg-primary text-white px-4 py-2 rounded-md">
          Create Course
        </Link>
      </div>
      <div>
        <h1 className="text-muted-foreground">Here you will see all of the courses .</h1>
      </div>
    </>
  )
}
