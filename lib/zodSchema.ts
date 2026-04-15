import {z} from "zod";

export const courseCategory = ["MATHEMATICS", "SCIENCE", "SOCIAL SCIENCE", "ENGLISH","ACCOUNTS","BST","IP/CS","ECONOMICS"] as const;  

export const courseStatus = ["DRAFT", "PUBLISHED","ARCHIVED"] as const;

export const courseLevel = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export const courseSchema = z.object({
  title: z.string().min(1,{message:"Title must be at least 1 character long"}). max(100,{message:"Title must be at most 100 characters long"}),
  description: z.string().min(3,{message:"Description must be at least 3 characters long"}),
  fileKey: z.string().min(1,{message:"File key must be at least 1 character long"}),
  price: z.coerce.number().min(0,{message:"Price must be at least 0"}),

  duration: z.coerce.number().min(0,{message:"Duration must be at least 0"}).max(500,{message:"Duration must be at most 500 hours"}),
  category: z.enum(courseCategory,{message:"Category is required"}),
  level: z.enum(courseLevel,{message:"Level is required"}),
  smallDescription: z.string().min(3,{message:"Small description must be at least 3 characters long"}).max(200,{message:"Small description must be at most 200 characters long"}),
  slug: z.string().min(3,{message:"Slug must be at least 3 characters long"}),
  status: z.enum(courseStatus,{message:"Status is required"}),
})


export const chapterSchema = z.object({
  name: z.string().min(3,{message: "Chapter name must be atleast 3 characters long"}),
  courseId: z.string().uuid({message:"Course ID must be a valid UUID"}),
})

export const lessonSchema = z.object({
  name: z.string().min(3,{message: "Lesson name must be atleast 3 characters long"}),
  courseId: z.string().uuid({message:"Course ID must be a valid UUID"}),
  chapterId: z.string().uuid({message:"Chapter ID must be a valid UUID"}),
  description: z.string().min(3,{message:"Description must be at least 3 characters long"}),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
})



export type LessonSchemaType = z.infer<typeof lessonSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;