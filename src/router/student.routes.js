import { Router } from "express";
import {
    getAllStudent,
    getByIdStudent,
    updateStudent,
    deleteStudent,
    createStudent,
} from "../controller/index.js"

export const studentRouter = new Router()

studentRouter.get("/",getAllStudent)
studentRouter.post("/", createStudent)
studentRouter.get("/:id",getByIdStudent)
studentRouter.put("/:id",updateStudent)
studentRouter.delete("/:id",deleteStudent)
