import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import Question from "./questions.model";
import User from "../user/user.model";
import MongoConnection from "@/backend/utils/db";

export const getQuestions = async (req: NextRequest) => {
  MongoConnection()
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
  MongoConnection()
  const userId = getIdFromUrl(req.url);
  const data = await Question.find({ userId: userId }).sort({ createdAt: -1 });
  return new Response(JSON.stringify(returnArrayData(data)), {
    status: httpStatus.OK,
  });
};

export const getSingleQuestionById = async (req: NextRequest) => {
  MongoConnection()
  const id = getIdFromUrl(req.url);
  const question = await Question.findById(id);
  if (!question) {
    return new NextResponse(
      JSON.stringify({
        message: "Question not found",
      }),
      {
        status: httpStatus.NOT_FOUND,
      }
    );
  }
  return new NextResponse(JSON.stringify(returnData(question)));
};

export const createQuestion = async (req: NextRequest) => {
  MongoConnection()
  const data = await req.json();

  const user = await User.findById(data?.userId);

  if (user.questionsCount.length >= 30) {
    return new Response(
      JSON.stringify({
        message: "You have reached the maximum number of questions",
      }),
      {
        status: httpStatus.BAD_REQUEST,
      }
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `today you are are a teacher of ${data?.subject} and specifically specialized in ${data?.topic} please act like one and answer my questions in a way that any student can understand.`,
      },
      {
        role: "user",
        content: data?.question,
      },
    ],
    max_tokens: 400,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  if (!response.created) {
    return new Response(
      JSON.stringify({
        message: "Somthing went wrong",
      }),
      {
        status: httpStatus.BAD_REQUEST,
      }
    );
  }

  const question = {
    ...data,
    answer: response?.choices[0]?.message?.content,
  };

  const savedQuestion = await Question.create(question);

  if (!savedQuestion) {
    return new Response(
      JSON.stringify({
        message: "Somthing went wrong, question not saved",
      }),
      {
        status: httpStatus.BAD_REQUEST,
      }
    );
  }

  // const updateUser = await User.findByIdAndUpdate(
  //   data?.userId,
  //   {
  //     questionsCount: user?.questionsCount + 1,
  //   },
  //   { new: true }
  // );

  return new Response(JSON.stringify(returnData(savedQuestion)), {
    status: httpStatus.CREATED,
  });
};
