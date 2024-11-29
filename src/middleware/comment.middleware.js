import { commentValidator } from "../validators/index.js";

export const validateComment = async (c, next) => {
    const comment = await c.req.body
    const { error } = commentValidator(comment)
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return c.json({ error: errorMessages }, 400)
    }
    return next();
};