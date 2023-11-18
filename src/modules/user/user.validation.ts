import Joi from "joi";
import { UserInterface } from "./user.interfaces";

const createUserBody: Record<keyof Omit<UserInterface,"id">, any> = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password:Joi.string().required(),
    email: Joi.string().required().email(),
    university:Joi.string().max(70),
    phone: Joi.string().max(30),
    domain:Joi.string().max(50),
    currentYearOfStudying:Joi.string().max(20),
    role:Joi.string().max(10),
}

export const createUserValidation = {
    body:Joi.object().keys(createUserBody)
}