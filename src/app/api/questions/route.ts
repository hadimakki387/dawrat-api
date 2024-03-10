import { createQuestion, getQuestions } from "@/backend/modules/questions/questions.service";
import MongoConnection from "@/backend/utils/db";
import { NextRequest } from "next/server";

MongoConnection();

export async function GET(req: NextRequest) {
  return await getQuestions(req);
}


export async function POST(req: NextRequest) {
  return await createQuestion(req);
}
