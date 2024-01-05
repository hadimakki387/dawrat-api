import { handleOtpGeneration } from "@/backend/modules/otp/otp.service";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    return await handleOtpGeneration(req)
}
