import { NextRequest } from "next/server";
import Question from "./questions.model";
import httpStatus from "http-status";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnArrayData } from "@/backend/helper-functions/returnData";

export const getQuestions = async (req: NextRequest) => {
  const params = new URL(req.url);
  const limit = params.searchParams.get("limit");

  if (limit) {
    const data = await Question.find().limit(parseInt(limit));
    return new Response(JSON.stringify(returnArrayData(data)), {
      status: httpStatus.OK,
    });
  }
  const data = await Question.find();
  return new Response(JSON.stringify(returnArrayData(data)), {
    status: httpStatus.OK,
  });
};

export const getQuestionsByUserId = async (req: NextRequest) => {
  const userId = getIdFromUrl(req.url);
  const data = await Question.find({ userId: userId });
  return new Response(JSON.stringify(returnArrayData(data)), {
    status: httpStatus.OK,
  });
};
