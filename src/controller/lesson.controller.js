import {
    getAllLessonService,
    getByIdLessonService,
    createLessonService,
    updateLessonService,
    deleteLessonService,
} from "../service/index.js"
import { lessonValidate } from "../validators/index.js"

export const createLesson = async (req, res, next) => {
    try {
        const { error, value } = lessonValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        const data = await createLessonService(req.body)
        return res.status(201).send({ status: "CREATED", data })
    } catch (err) {
        next(err)
    }
}

export const getAllLesson = async (req, res, next) => {
    try {
        const data = await getAllLessonService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdLesson = async (req, res, next) => {
    try {
        const data = await getByIdLessonService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateLesson = async (req, res, next) => {
    try {
        const updatedCourse = await updateLessonService(
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

export const deleteLesson = async (req, res, next) => {
    try {
        const deleted = await deleteLessonService(req.params.id)
        if (!deleted) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
