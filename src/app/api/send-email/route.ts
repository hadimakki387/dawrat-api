import Otp from "@/backend/modules/otp/otp.model";
import User from "@/backend/modules/user/user.model";
import { emailTemplate } from "@/backend/utils/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer"
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/ses-transport";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const email = body?.email;
  const user = User.find({ email: email });
  if (!user) {
    return new NextResponse("user not found", {
      status: 404,
    });
  }
  const otp = await Otp.create({ email: email, otp: 123456 });
  console.log(otp);

  // var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: process.env.MY_EMAIL,
  //       pass: process.env.MY_PASS
  //     }
  //   });
  //   //generate otp with 6 digits
  //   const otp = Math.floor(100000 + Math.random() * 900000)
  //   var mailOptions:MailOptions = {
  //     from: 'hmakki387@gmail.com',
  //     to: 'hmakki389@gmail.com',
  //     subject: 'OTP for your account',
  //     text : emailTemplate(otp,"Hadi Makki")
  //   };

  //   transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  return new NextResponse("test");
}
