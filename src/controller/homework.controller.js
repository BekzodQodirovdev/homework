import {
    getAllHomeworkService,
    getByIdHomeworkService,
    createHomeworkService,
    updateHomeworkService,
    deleteHomeworkService,
} from "../service/index.js"
import { homeworkValidate } from "../validators/index.js"

export const createHomework = async (req, res, next) => {
    try {
        const { error, value } = homeworkValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        const data = await createHomeworkService(req.body)
        return res.status(201).send({ status: "CREATED", data })
    } catch (err) {
        next(err)
    }
}

export const getAllHomework = async (req, res, next) => {
    try {
        const data = await getAllHomeworkService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdHomework = async (req, res, next) => {
    try {
        const data = await getByIdHomeworkService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateHomework = async (req, res, next) => {
    try {
        const updatedCourse = await updateHomeworkService(
            req.params.id,
            req.body,
        )
        if (!updatedCourse) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(202).send({ status: "UPDATED", data: updatedCourse })
    } catch (err) {
        next(err)
    }
}

export const deleteHomework = async (req, res, next) => {
    try {
        const deleted = await deleteHomeworkService(req.params.id)
        if (!deleted) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
