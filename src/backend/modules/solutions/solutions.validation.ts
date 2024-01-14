import Joi from "joi";
import { SolutionInterface } from "./solutions.interface";

const createSolution: Record<
  keyof Pick<SolutionInterface, "document"|"doc"|"title"|"description">,
  any
> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  doc: Joi.object().keys({
    name: Joi.string().required(),
    size: Joi.number().required(),
    key: Joi.string().required(),
    url: Joi.string().required(),
  }),
  document: Joi.string().required(),
};

const updateSolution: Record<
  keyof Pick<SolutionInterface, "title"|"description">,
  any
> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
};

export const updateSolutionValidation = {
  body: Joi.object().keys(updateSolution),
};

export const createSolutionValidation = {
  body: Joi.object().keys(createSolution),
};
