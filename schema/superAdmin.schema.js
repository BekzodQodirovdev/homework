import Joi, { valid } from "joi";

const superAdminChek = Joi.object({
  name: Joi.string().alphanum().min(3).max(100).required(),
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
  role: Joi.string().valid("admin","user")
});

export default (data) => superAdminChek.validate(data);
