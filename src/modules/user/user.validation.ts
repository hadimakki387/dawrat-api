import Joi from "joi";
import { UserInterface } from "./user.interfaces";

const createUserBody: Record<keyof UserInterface, any> = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password:Joi.string().required(),
    email: Joi.string().required().email(),
    university:Joi.string().required(),
    phone: Joi.string().required(),
    domain:Joi.string().required(),
    currentYearOfStudying:Joi.string().required(),
    role:Joi.string(),
    id:Joi.string()
}

export const createUserValidation = {
    body:Joi.object().keys(createUserBody)
}