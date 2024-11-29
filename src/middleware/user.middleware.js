import { userValidator } from "../validators/index.js";

export const validateUser = async (c, next) => {
    const user = await c.req.body
    const { error } = userValidator(user)
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return c.json({ error: errorMessages }, 400)
    }
    return next();
};