import Joi from "joi"

export const studentValidate = (data) => {
    const schema = Joi.object({
        permission: Joi.boolean().required(),
        user_id: Joi.number().integer().required(),
    })

    return schema.validate(data)
}
