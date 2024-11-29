import Joi from "joi";

export const userValidator = (user) => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            "string.base": `"title" string bo'lishi kerak`,
            "any.required": `"title" maydoni bo'sh bolmasligi kerak`
        }),
        email: Joi.string().required().messages({
            "string.base": `"email" string bo'lishi kerak`,
            "any.required": `"email" maydoni bo'sh bolmasligi kerak`
        }),
        password: Joi.string().required().messages({
            "string.base": `"password" string bo'lishi kerak`,
            "any.required": `"password" maydoni bo'sh bolmasligi kerak`
        })
    })
    return schema.validate(user, {abortEarly: false})
}