import { Hono } from "hono"
import { AuthController } from "../controller/index.js"
import { validateUser } from "../middleware/user.middleware.js"

export const authRouter = new Hono()

authRouter.post("/signup", validateUser, AuthController.register)
authRouter.post("/signin", AuthController.login)
