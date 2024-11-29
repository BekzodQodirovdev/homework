import Joi from "joi";

export const postValidator = (post) => {
    const schema = Joi.object({
        user_id: Joi.number().required().messages({
            "number.base": `"user_id" raqam bo'lishi kerak`,
            "any.required": `"user_id" maydoni majburiy`,
        }),
        title: Joi.string().required().messages({
            "string.base": `"title" string bo'lishi kerak`,
            "any.required": `"title" maydoni bo'sh bolmasligi kerak`
        }),
        body: Joi.string().required().messages({
            "string.base": `"body" string bo'lishi kerak`,
            "any.required": `"body" maydoni bo'sh bolmasligi kerak`
        })
    })
    return schema.validate(post, {abortEarly: false})
}