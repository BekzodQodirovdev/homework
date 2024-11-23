import { Router } from "express";
import {
    getAllTeacher,
    getByIdTeacher,
    updateTeacher,
    deleteTeacher,
    createTeacher,
} from "../controller/index.js"

export const teacherRouter = new Router()

teacherRouter.get("/",getAllTeacher)
teacherRouter.post("/", createTeacher)
teacherRouter.get("/:id",getByIdTeacher)
teacherRouter.put("/:id",updateTeacher)
teacherRouter.delete("/:id",deleteTeacher)
