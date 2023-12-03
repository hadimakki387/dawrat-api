// i want to validate the data that is being sent to the server using joi package

// Compare this snippet from src/backend/modules/user/user.validation.ts:
// import Joi from "joi";

import Joi from "joi";
import { QuestionInterface } from "./questions.interface";

const createQuestionBody: Record<
  keyof Omit<QuestionInterface, "id" | "ownerName">,
  any
> = {
  subject: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.string().required(),
  university: Joi.string().required(),
  course: Joi.string().required(),
  userId: Joi.string().required(),
  topic: Joi.string().required(),
  createdAt: Joi.string(),
    updatedAt: Joi.string(),
};

export const createQuestionValidation = {
  body: Joi.object().keys(createQuestionBody),
};
