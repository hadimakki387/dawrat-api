import { handleOtpGeneration } from "@/backend/modules/otp/otp.service";
import { emailTemplate } from "@/backend/utils/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function PATCH(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "hmakki387@gmail.com",
    to: ["delivered@resend.dev"],
    subject: "Hello world",
    text: emailTemplate(123123, "Hadi Makki"),
  });
  if (error) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 400,
      }
    );
  }
  return new NextResponse(
    JSON.stringify({
      message: "OTP sent successfully",
    }),
    {
      status: 200,
    }
  );
}
