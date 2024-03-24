import MongoConnection from "@/backend/utils/db";
import axios from 'axios';
import { NextRequest, NextResponse } from "next/server";
import User from "../user/user.model";
import Otp from "./otp.model";
import { generateOtpValidation, verifyOtpValidation } from "./otp.validation";
import EmailTemplate from "@/backend/utils/EmailTemplate";
import * as bcrypt from 'bcryptjs'

interface sendEmailInterface{ email_to:string, template:string ,subject:string,from:string,ownerEmail:string,emailPassword:string}

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
  const user = await User.findOne({ email: email });
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
  await Otp.create({ email: email, otp: otp });


  try {
    return await axios.post(process.env.SEND_EMAIL_LINK as string, {
      email_to: email,
      template: EmailTemplate({otp:otp,username:user.firstName}),
      subject: "OTP Verification",
      from: process.env.MY_EMAIL,
      ownerEmail: process.env.MY_EMAIL,
      emailPassword: process.env.MY_PASS,
    }).then(()=>{
      return new NextResponse(
      JSON.stringify({
        message: "OTP has been sent to your email",
      }),
      {
        status: 200,
      }
    );
    }).catch((err)=>{
      throw new Error(err.response.data);
    })

    
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
  const password = await bcrypt.hash(body?.password, 8);
   await User.findOneAndUpdate(
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
