import Joi from "joi"

export const courseValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().allow(null, "").optional(),
        start_time: Joi.date().required(),
        end_time: Joi.date().min(Joi.ref("start_time")).required(),
    })

    return schema.validate(data)
}
