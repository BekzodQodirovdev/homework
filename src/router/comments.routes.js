import { Hono } from "hono"
import { CommentController } from "../controller/index.js"
import { validateComment } from "../middleware/index.js"

export const commentRouter = new Hono()

commentRouter.get("/", CommentController.getAll)
commentRouter.get("/:id", CommentController.getOne)
commentRouter.post("/", validateComment, CommentController.create)
commentRouter.put("/:id", validateComment, CommentController.update)
commentRouter.delete("/:id", CommentController.delete)
