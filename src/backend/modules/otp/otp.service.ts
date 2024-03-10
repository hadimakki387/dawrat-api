import EmailTemplate from "@/backend/utils/EmailTemplate";
import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import User from "../user/user.model";
import Otp from "./otp.model";
import { generateOtpValidation, verifyOtpValidation } from "./otp.validation";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  // const createOtp = await Otp.create({ email: email, otp: otp });


  try {
    const sendEmail = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "OTP for password reset",
      react: EmailTemplate({ username: "Hadi makki", otp: otp }),
    });
    console.log("sendEmail")
    console.log(sendEmail)

    return new NextResponse(
      JSON.stringify({
        message: "OTP has been sent to your email",
        data: sendEmail,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error,
      }),
      {
        status: 400,
      }
    );
  }
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
  // const password = await bcrypt.hash(body?.password, 8);
  // const changePass = await User.findOneAndUpdate(
  //   { email: email },
  //   { password: password }
  // );

  return new NextResponse(
    JSON.stringify({
      message: "Password has been changed",
    }),
    {
      status: 200,
    }
  );
};
