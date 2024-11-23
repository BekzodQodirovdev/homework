import { Router } from "express";
import {
    getAllUser,
    getByIdUser,
    updateUser,
    deleteUser,
    createUser,
} from "../controller/index.js"

export const userRouter = new Router()

userRouter.get("/",getAllUser)
userRouter.post("/", createUser)
userRouter.get("/:id",getByIdUser)
userRouter.put("/:id",updateUser)
userRouter.delete("/:id",deleteUser)
