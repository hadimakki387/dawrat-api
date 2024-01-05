import Joi from "joi";

const generateOtp = {
  email: Joi.string().email().required(),
};
const verifyOtp = {
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
  password: Joi.string().min(6).required(),
};

export const verifyOtpValidation = {
  body: Joi.object().keys(verifyOtp),
};

export const generateOtpValidation = {
  body: Joi.object().keys(generateOtp),
};
