import { env } from "@/lib/env";

export function useConstruct(fileKey:string):string {
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.t3.tigrisfiles.io/${fileKey}`
    
}