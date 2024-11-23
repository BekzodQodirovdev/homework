import Joi from "joi"

export const teacherValidate = (data) => {
    const validation = Joi.object({
        user_id: Joi.number().required(),
    })

    return validation.validate(data)
}
