import Joi from "joi"

export const homeworkValidate = Joi.object({
    id: Joi.number().integer().positive(),
    text: Joi.string().min(10).required().messages({
        "string.empty": "Homework text is required.",
        "string.min": "Homework text must be at least 10 characters long.",
    }),
    grade_id: Joi.number().integer().positive().allow(null),
    file: Joi.string()
        .regex(/\.(pdf|docx)$/i)
        .allow(null, "")
        .messages({
            "string.pattern.base": "File must be in PDF or DOCX format.",
        }),
    link: Joi.string().uri().allow(null, "").messages({
        "string.uri": "Link must be a valid URL.",
    }),
})
