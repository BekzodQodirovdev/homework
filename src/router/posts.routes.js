import { Hono } from "hono"
import { PostsController } from "../controller/index.js"
import { authGuard, validatePost } from "../middleware/index.js"

export const postsRouter = new Hono()

postsRouter.get("/getAll", authGuard, PostsController.getAll)
postsRouter.get("/:id", authGuard, PostsController.getOne)
postsRouter.post("/posts/", authGuard, validatePost, PostsController.create)
postsRouter.put("/:id", authGuard, validatePost, PostsController.update)
postsRouter.delete("/:id", authGuard, PostsController.delete)
