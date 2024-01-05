import { NextRequest, NextResponse } from "next/server";
import User from "../user/user.model";
import Otp from "./otp.model";
import MongoConnection from "@/backend/utils/db";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { emailTemplate } from "@/backend/utils/emailTemplate";
import { generateOtpValidation, verifyOtpValidation } from "./otp.validation";
import * as bcrypt from "bcryptjs";

export const handleOtpGeneration = async (req: NextRequest) => {
  MongoConnection();
  const body = await req.json();
  const validateData = generateOtpValidation.body.validate(body);
  if (validateData.error) {
    return new NextResponse(JSON.stringify(validateData.error.message), {
      status: 400,
    });
  }
  const email = body?.email;
  const user = User.find({ email: email });
  if (!user) {
    return new NextResponse(
      JSON.stringify({
        message: "user not found",
      }),
      {
        status: 404,
      }
    );
  }
  await Otp.findOneAndDelete({ email: email });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const createOtp = await Otp.create({ email: email, otp: otp });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });
  //generate otp with 6 digits
  var mailOptions: MailOptions = {
    from: "hmakki387@gmail.com",
    to: `${email}`,
    subject: "OTP for your account",
    text: emailTemplate(otp, "Hadi Makki"),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return new NextResponse(
        JSON.stringify({
          message: error.message,
        }),
        {
          status: 500,
        }
      );
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return new NextResponse(
    JSON.stringify({
      message: "OTP has been sent to your email",
    }),
    {
      status: 200,
    }
  );
};

export const checkOtpAndChangePass = async (req: NextRequest) => {
  const body = await req.json();
  const validateData = verifyOtpValidation.body.validate(body);
  if (validateData.error) {
    return new NextResponse(JSON.stringify(validateData.error.message), {
      status: 400,
    });
  }
  const email = body?.email;
  const otp = body?.otp;

  const user = await User.findOne({ email: email });
  if (!user) {
    return new NextResponse(
      JSON.stringify({
        message: "User not found",
      }),
      {
        status: 404,
      }
    );
  }

  const result = await Otp.findOne({ email: email, otp: otp });
  if (!result) {
    return new NextResponse(
      JSON.stringify({
        message: "OTP is Expired",
      }),
      {
        status: 400,
      }
    );
  }
  if (result?.otp !== parseInt(body?.otp)) {
    return new NextResponse(
      JSON.stringify({
        message: "OTP is not correct",
      }),
      {
        status: 400,
      }
    );
  }
  await Otp.findByIdAndDelete(result?._id);
  const password = await bcrypt.hash(body?.password, 8);
  const changePass = await User.findOneAndUpdate(
    { email: email },
    { password: password }
  );

  return new NextResponse(
    JSON.stringify({
      message: "Password has been changed",
    }),
    {
      status: 200,
    }
  );
};
