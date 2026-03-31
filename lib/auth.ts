import "server-only"



import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders:{
      github:{
        clientId: env.AUTH_CLIENT_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
      },
    },
    plugins: [
      emailOTP({
        async sendVerificationOTP({ email, otp }: { email: string; otp: string }) {
          // implement sending the email to user
        await resend.emails.send({
      from: 'Pathshalaa <onboarding@grfti.in>',
      to: [email],
      subject: 'Pathshalaa - Verify your email',
      html:`<p>Hello,</p>
      <strong>Your OTP is: ${otp}</strong>
      <p>Regards,</p>
      <p>Pathshalaa</p>`
        })
        
        }
      }),
    ]
});