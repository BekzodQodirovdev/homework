import Joi from "joi"

export const userValidate = (data) => {
    const validation = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })

    return validation.validate(data)
}
