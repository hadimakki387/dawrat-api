// in this file i will be implementing the route for the openai api in my nextjs app
// this will be a post request

import Question from "@/backend/modules/questions/questions.model";
import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const data = {
  id: "chatcmpl-8RgCf0nL9bYspAS8dwwJeVBCjJI2L",
  object: "chat.completion",
  created: 1701607777,
  model: "gpt-3.5-turbo-0613",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "To improve your algebra skills, there are a few strategies you can follow:\n\n1. Practice regularly: Algebra is a skill that requires practice. Solve problems regularly, attempting different types of equations and exercises. The more you practice, the more comfortable you will become with the concepts.\n\n2. Review foundational concepts: Make sure you have a solid understanding of the basic concepts in algebra, such as operations with numbers, order of operations, and solving equations. If you feel you are struggling with some of these concepts, review them before moving on to more advanced topics.\n\n3. Seek help when needed: Don't hesitate to ask for help if you encounter difficulties understanding a concept or solving a problem. Talk to your teacher, ask a classmate, or consider getting a tutor. Sometimes a different perspective can make all the difference in understanding a challenging concept.\n\n4. Take advantage of resources: There are many resources available to help you learn and practice algebra. Utilize textbooks, online tutorials, videos, and practice worksheets to reinforce your understanding.\n\n5. Break down problems step-by-step: When solving algebraic problems, break them down into smaller, manageable steps. This will help you avoid mistakes and make the process less overwhelming.\n\n6. Visualize problems: Sometimes, visualizing the problem or using graphs and diagrams can make it easier to understand and solve. For example, graphing equations can help you visualize their solutions.\n\n7. Stay organized: Keep your notes, homework, and class materials organized. Algebra often builds on previously learned concepts, so having a clear record of what you have learned will make it easier to review and revisit topics.\n\nRemember, improving in algebra takes time and effort. With consistent practice and a positive mindset, you will gradually become more comfortable with the subject.",
      },
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 39,
    completion_tokens: 353,
    total_tokens: 392,
  },
  system_fingerprint: null,
};

MongoConnection()

export async function POST(req: NextRequest, res: NextResponse) {
  const { message } = await req.json();

  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "You are an algebra teacher please act like one and answer my questions in a way that any student can understand.",
  //     },
  //     {
  //       role: "user",
  //       content: "How to better in algebra?",
  //     },
  //   ],
  //   max_tokens: 400,
  //   temperature: 0.9,
  //   top_p: 1,
  //   presence_penalty: 0,
  //   frequency_penalty: 0,

  // });
  // const question = {
  //   subject: "Math",
  //   topic: "Algebra",
  //   question: "How to better in algebra?",
  //   answer:
  //     "To improve your algebra skills, there are a few strategies you can follow:\n\n1. Practice regularly: Algebra is a skill that requires practice. Solve problems regularly, attempting different types of equations and exercises. The more you practice, the more comfortable you will become with the concepts.\n\n2. Review foundational concepts: Make sure you have a solid understanding of the basic concepts in algebra, such as operations with numbers, order of operations, and solving equations. If you feel you are struggling with some of these concepts, review them before moving on to more advanced topics.\n\n3. Seek help when needed: Don't hesitate to ask for help if you encounter difficulties understanding a concept or solving a problem. Talk to your teacher, ask a classmate, or consider getting a tutor. Sometimes a different perspective can make all the difference in understanding a challenging concept.\n\n4. Take advantage of resources: There are many resources available to help you learn and practice algebra. Utilize textbooks, online tutorials, videos, and practice worksheets to reinforce your understanding.\n\n5. Break down problems step-by-step: When solving algebraic problems, break them down into smaller, manageable steps. This will help you avoid mistakes and make the process less overwhelming.\n\n6. Visualize problems: Sometimes, visualizing the problem or using graphs and diagrams can make it easier to understand and solve. For example, graphing equations can help you visualize their solutions.\n\n7. Stay organized: Keep your notes, homework, and class materials organized. Algebra often builds on previously learned concepts, so having a clear record of what you have learned will make it easier to review and revisit topics.\n\nRemember, improving in algebra takes time and effort. With consistent practice and a positive mindset, you will gradually become more comfortable with the subject.",
  //   university: "university of lagos",
  //   course: "algebra",
  //   userId: "65573975d1514963f263b311",
  // };
  
  // await Question.create(question);

  return new Response(JSON.stringify(data?.choices[0].message));
}
