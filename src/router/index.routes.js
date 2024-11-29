import { Hono } from "hono"
export const indexRouter = new Hono()
import {
    authRouter,
    usersRouter,
    commentRouter,
    postsRouter,
} from "./index.js"
import { authGuard } from "../middleware/token/index.js"

indexRouter.use("/auth", authRouter)
indexRouter.use("/users", authGuard, usersRouter)
indexRouter.use("/comments", authGuard, commentRouter)
indexRouter.use("/posts", authGuard, postsRouter)
