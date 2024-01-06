import { getSingleQuestionById } from "@/backend/modules/questions/questions.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getSingleQuestionById(req);
}
