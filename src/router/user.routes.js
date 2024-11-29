import { Hono } from "hono"
import { UsersController } from "../controller/index.js"
import { validateUser } from "../middleware/index.js"

export const usersRouter = new Hono()

usersRouter.get("/", UsersController.getAll)
usersRouter.get("/:id", UsersController.getOne)
usersRouter.post("/", validateUser, UsersController.create)
usersRouter.put("/:id", validateUser, UsersController.update)
usersRouter.delete("/:id", UsersController.delete)
