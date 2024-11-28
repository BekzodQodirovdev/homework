import { Router } from "express";
import {
    getAllExam,
    getByIdExam,
    updateExam,
    deleteExam,
    createExam,
} from "../controller/index.js"

export const examRouter = new Router()

examRouter.get("/",getAllExam)
examRouter.post("/", createExam)
examRouter.get("/:id",getByIdExam)
examRouter.put("/:id",updateExam)
examRouter.delete("/:id",deleteExam)
