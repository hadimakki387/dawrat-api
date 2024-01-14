import Joi from "joi";
import { DocumentInterface } from "./document.interface";

const createDocument: Record<keyof Omit<DocumentInterface,"id"| "_id">, any> = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    domain: Joi.string().required(),
    university: Joi.string().required(),
    currentYearOfStudying: Joi.string(),
    ownerId: Joi.string().required(),
    doc: Joi.object().keys({
        name: Joi.string().required(),
        size: Joi.number().required(),
        key: Joi.string().required(),
        url: Joi.string().required(),
    }),
    course: Joi.string().required(),
    createdAt: Joi.string(),
    modifiedAt: Joi.string(),
    courseName:Joi.string(),
    upvotes:Joi.number(),
    downvotes:Joi.number(),
    universityName:Joi.string(),
    courseTitle:Joi.string(),
    solution:Joi.string(),
}



export const createDocumentValidation = {
    body:Joi.object().keys(createDocument)
}