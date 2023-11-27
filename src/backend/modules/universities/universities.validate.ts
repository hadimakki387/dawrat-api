// we are going to validate the data that we are going to send to the database

import Joi from "joi";
import { UniversityInterface } from "./universities.interface";

const createUniversity: Record<keyof Omit<UniversityInterface, "id">, any> = {
  title: Joi.string().required(),
  abr: Joi.string().required(),
};

export const createUniversityValidation = {
  body: Joi.object().keys(createUniversity),
};
