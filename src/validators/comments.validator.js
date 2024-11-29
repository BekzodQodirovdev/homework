import Joi from "joi";

export const commentValidator = (comment) => {
    const schema = Joi.object({
        user_id: Joi.number().required().messages({
            "number.base": `"user_id" raqam bo'lishi kerak`,
            "any.required": `"user_id" maydoni majburiy`,
        }),
        post_id: Joi.number().required().messages({
            "number.base": `"post_id" raqam bo'lishi kerak`,
            "any.required": `"post_id" maydoni majburiy`,
        }),
        body: Joi.string().required().messages({
            "string.base": `"body" string bo'lishi kerak`,
            "any.required": `"body" maydoni bo'sh bolmasligi kerak`
        })
    })
    return schema.validate(comment, {abortEarly: false})
}