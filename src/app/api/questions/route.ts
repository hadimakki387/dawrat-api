import { createQuestion, getQuestions } from "@/backend/modules/questions/questions.service";
import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";

MongoConnection();

export async function GET(req: NextRequest) {
  return await getQuestions(req);
}


export async function POST(req: NextRequest, res: NextResponse) {
  return await createQuestion(req);
}
