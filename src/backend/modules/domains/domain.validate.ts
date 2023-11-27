
import Joi from "joi";
import { DomainInterface } from "./domain.interface";

const createDomain: Record<keyof Omit<DomainInterface, "id">, any> = {
  title: Joi.string().required(),
  university: Joi.string().required(),
};

export const createDomainValidation = {
  body: Joi.object().keys(createDomain),
};
