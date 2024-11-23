import { Router } from "express"
import {
    getAllUser,
    getByIdUser,
    updateUser,
    deleteUser,
    createUser,
} from "../controller/index.js"
import { authGuard, isCheked, roleGuard } from "../middleware/index.js"

export const userRouter = new Router()

userRouter.get("/", authGuard, roleGuard(["admin"]), getAllUser)
userRouter.post("/", createUser)
userRouter.get(
    "/:id",
    authGuard,
    isCheked,
    roleGuard(["admin", "user"]),
    getByIdUser,
)
userRouter.put("/:id", authGuard, isCheked, updateUser)
userRouter.delete("/:id", authGuard, isCheked, deleteUser)
