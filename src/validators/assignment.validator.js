import Joi from "joi"

export const assignmentValidate = (data) => {
    const schema = Joi.object({
        course_id: Joi.number().integer().required(),
        student_id: Joi.number().integer().required(),
        teacher_id: Joi.number().integer().required(),
    })

    return schema.validate(data)
}
