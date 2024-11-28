import {
    getAllExamService,
    getByIdExamService,
    createExamService,
    updateExamService,
    deleteExamService,
} from "../service/index.js"
import { ExamValidate } from "../validators/index.js"

export const createExam = async (req, res, next) => {
    try {
        const { error, value } = ExamValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        const data = await createExamService(req.body)
        return res.status(201).send({ status: "CREATED", data })
    } catch (err) {
        next(err)
    }
}

export const getAllExam = async (req, res, next) => {
    try {
        const data = await getAllExamService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdExam = async (req, res, next) => {
    try {
        const data = await getByIdExamService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateExam = async (req, res, next) => {
    try {
        const updatedExam = await updateExamService(
            req.params.id,
            req.body,
        )
        if (!updatedExam) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(202).send({ status: "UPDATED", data: updatedExam })
    } catch (err) {
        next(err)
    }
}

export const deleteExam = async (req, res, next) => {
    try {
        const deleted = await deleteExamService(req.params.id)
        if (!deleted) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
