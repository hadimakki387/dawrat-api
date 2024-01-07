import Joi from "joi";
import { StudylistInterface } from "./studylist.interface";

const createStudylist: Record<
  keyof Omit<StudylistInterface, "id" | "_id">,
  any
> = {
  title: Joi.string().required(),
  description: Joi.string(),
  documents: Joi.array().items(Joi.string()),
  owner: Joi.string(),
};

const updateStudylist: Record<
  keyof {document:string,userId:string},
  any
> = {
  document: Joi.string().required(),
  userId: Joi.string().required(),
};

export const createStudylistValidation = {
  body: Joi.object().keys(createStudylist),
};

export const updateStudylistValidation = {
  body: Joi.object().keys(updateStudylist),
};
