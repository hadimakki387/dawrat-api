// i want to make course validation using joi
import Joi from "joi";
import { courseInterface } from "./courses.interface";

const createCourse: Record<keyof Omit<courseInterface, "id">, any> = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    domain: Joi.string().required(),
    university: Joi.string().required(),
    ownerId: Joi.string().required(),
    universityName: Joi.string().required(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
};

export const createCourseValidation = {
    body: Joi.object().keys(createCourse),
};