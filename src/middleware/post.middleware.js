import { postValidator } from "../validators/index.js";

export const validatePost = async (c, next) => {
    const post = await c.req.body
    const { error } = postValidator(post)
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return c.json({ error: errorMessages }, 400)
    }
    return next();
};