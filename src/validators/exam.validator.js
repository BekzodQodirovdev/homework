import Joi from "joi"

export const ExamValidate = Joi.object({
    title: Joi.string().min(5).required().messages({
        "string.empty": "Exam text is required.",
        "string.min": "Exam text must be at least 5 characters long.",
    }),
    file: Joi.string()
        .regex(/\.(pdf|docx)$/i)
        .allow(null, "")
        .messages({
            "string.pattern.base": "File must be in PDF or DOCX format.",
        }),
    course_id: Joi.number().integer().positive().allow(null),
})
