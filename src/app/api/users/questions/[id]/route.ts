import { NextRequest } from "next/server";
import { getQuestionsByUserId } from "../../../../../backend/modules/questions/questions.service";
export async function GET(req: NextRequest) {
  return await getQuestionsByUserId(req);
}
