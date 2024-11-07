import Joi from "joi";

const adminChek = Joi.object({
  name: Joi.string().alphanum().min(3).max(100).required(),
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
  role: Joi.string().valid("user"),
});

export default (data) => adminChek.validate(data);
