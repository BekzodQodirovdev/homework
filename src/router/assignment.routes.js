import { Router } from "express";
import {
    getAllAssignment,
    getByIdAssignment,
    updateAssignment,
    deleteAssignment,
    createAssignment,
} from "../controller/index.js"

export const assignmentRouter = new Router()

assignmentRouter.get("/",getAllAssignment)
assignmentRouter.post("/", createAssignment)
assignmentRouter.get("/:id",getByIdAssignment)
assignmentRouter.put("/:id",updateAssignment)
assignmentRouter.delete("/:id",deleteAssignment)
