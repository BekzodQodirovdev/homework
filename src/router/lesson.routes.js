import { Router } from "express";
import {
    getAllLesson,
    getByIdLesson,
    updateLesson,
    deleteLesson,
    createLesson,
} from "../controller/index.js"

export const lessonRouter = new Router()

lessonRouter.get("/",getAllLesson)
lessonRouter.post("/", createLesson)
lessonRouter.get("/:id",getByIdLesson)
lessonRouter.put("/:id",updateLesson)
lessonRouter.delete("/:id",deleteLesson)
