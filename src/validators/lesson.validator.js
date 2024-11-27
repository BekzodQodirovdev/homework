import Joi from "joi"

export const lessonValidate = Joi.object({
    id: Joi.number().integer().positive(),
    lesson_name: Joi.string().max(255).required().messages({
        "string.empty": "Lesson name is required.",
        "string.max": "Lesson name must not exceed 255 characters.",
    }),
    homework_id: Joi.number().integer().positive().allow(null),
    vidio_id: Joi.number().integer().positive().allow(null),
    homework: Joi.string().allow(null, ""),
    room: Joi.string().max(255).allow(null, "").messages({
        "string.max": "Room must not exceed 255 characters.",
    }),
    start_at: Joi.date().required().messages({
        "date.base": "Start date is required and must be a valid date.",
    }),
    end_at: Joi.date().greater(Joi.ref("start_at")).required().messages({
        "date.greater": "End date must be after start date.",
    }),
    grads: Joi.string().allow(null, ""),
})
