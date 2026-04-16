import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({isDragActive}: {isDragActive: boolean})
{
  return(
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon 
          className={cn("size-6 text-muted-foreground",
            isDragActive && ("text-primary") 
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop your files here or{" "}
        <span className="text-primary font-bold cursor-pointer">click to upload</span>
      </p>
      <Button className="mt-4" type="button">Select File</Button>
    </div>
  )
}

export function RenderErrorState(){
  return(
    <div className="text-destructive text-center">
      <div className="flex items-center justify-center mx-auto size-12 rounded-full mb-4 bg-destructive/30">
        <ImageIcon 
          className={cn("size-6 text-destructive"
          )}
        />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs mt-1 text-muted-foreground ">Something went wrong</p>
      <Button className="mt-4" type="button">Retry</Button>
    </div>
  )
}

export function RenderUploadedState({previewUrl,isDeleting,handdleRemoveFile,fileType}: {previewUrl: string, isDeleting: boolean, handdleRemoveFile: () => void, fileType: "image" | "video"})
{
  return(
    <div className="relative group w-full h-full flex items-center justify-center">
      {fileType === "video" ? (
        <video src={previewUrl} controls className="rounded-md w-full h-full"/>
      ):(
        <Image src={previewUrl} alt="preview" className="object-contain p-2" fill />
      )}
      <Button variant="destructive" size="icon" className={cn("absolute top-4 right-4")}
        onClick={handdleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin"/>
        ):(
          <XIcon className="size-4"/>
        )}
      </Button>
    </div>
    
  )
}

export function RenderUploadingState({progress,file}: {progress: number, file: File})
{
  return(
    <div className="text-center flex justify-center items-center flex-col">
      <p>{progress}%</p>
      <p className="mt-2 text-sm fonty-medium text-foreground ">Uploading....</p>
      <p className="text-xs mt-1 text-muted-foreground truncate max-w-xs ">{file.name}</p>
    </div>
  )
}
