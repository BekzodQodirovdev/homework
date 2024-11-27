import { Router } from "express";
import {
    getAllHomework,
    getByIdHomework,
    updateHomework,
    deleteHomework,
    createHomework,
} from "../controller/index.js"

export const homeworkRouter = new Router()

homeworkRouter.get("/",getAllHomework)
homeworkRouter.post("/", createHomework)
homeworkRouter.get("/:id",getByIdHomework)
homeworkRouter.put("/:id",updateHomework)
homeworkRouter.delete("/:id",deleteHomework)
