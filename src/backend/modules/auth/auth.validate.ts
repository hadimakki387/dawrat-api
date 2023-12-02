import Joi from "joi";

const loginUser: Record<keyof Pick<loginUserInterface,"email" | "password">, any> = {
  password: Joi.string().required(),
  email: Joi.string().required().email(),
};

export const loginUserValidate = {
    body:Joi.object().keys(loginUser).unknown(false)
}