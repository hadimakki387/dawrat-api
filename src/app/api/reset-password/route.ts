import { checkOtpAndChangePass } from "@/backend/modules/otp/otp.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await checkOtpAndChangePass(req);
}
