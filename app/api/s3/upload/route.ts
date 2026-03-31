import { PutObjectCommand,  } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";
import { getSignedUrl} from "@aws-sdk/s3-request-presigner";

import { S3 } from "@/lib/S3Client";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const uploadSchema = z.object({
  fileName: z.string().min(1,{message:"File name is required"}),
  contentType: z.string().min(1,{message:"Content type is required"}),
  size: z.number().min(1,{message:"Size is required"}),
  isImage: z.boolean(),
})

const aj = arcjet.withRule(
  detectBot({
    mode:"LIVE",
    allow:[],
  })
).withRule(
  fixedWindow({
    mode:"LIVE",
    window:"1m",
    max:5,
  })
)

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  try {
    
    const decision = await aj.protect(req ,{fingerprint:session?.user.id as string});

    if(decision.isDenied()){
      return NextResponse.json({error:"dudde not good"},{status:429});
    }


    const body = await req.json();
    const validation = uploadSchema.safeParse(body);
    if(!validation.success){
      return NextResponse.json(
        {error:"Invalid Request Body"},
        {status:400}
      );
    }
    
    const {fileName, contentType, size} = validation.data;
    const unique = `${uuidv4()}-${fileName}`

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
      ContentType: contentType,
      ContentLength: size,
      Key: unique,
  });

  const presignedUrl = await getSignedUrl(S3, command, {
    expiresIn: 360,
  });

  const response = {
    presignedUrl,
    key: unique,
  };

  return NextResponse.json(response);


  } catch (error) {
    return NextResponse.json(
      {error:"Internal Server Error"},
      {status:500}
    );
  }
}

function fingerprint(arg0: string): { fingerprint: string | number | boolean; } {
  throw new Error("Function not implemented.");
}
