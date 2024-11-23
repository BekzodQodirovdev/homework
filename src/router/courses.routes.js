import { Router } from "express";
import {
    getAllCourses,
    getByIdCourses,
    updateCourses,
    deleteCourses,
    createCourses,
} from "../controller/index.js"

export const coursesRouter = new Router()

coursesRouter.get("/",getAllCourses)
coursesRouter.post("/", createCourses)
coursesRouter.get("/:id",getByIdCourses)
coursesRouter.put("/:id",updateCourses)
coursesRouter.delete("/:id",deleteCourses)
