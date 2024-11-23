import {
    getAllCoursesService,
    getByIdCoursesService,
    createCoursesService,
    updateCoursesService,
    deleteCoursesService,
} from "../service/index.js"
import { courseValidate } from "../validators/index.js"

export const createCourses = async (req, res, next) => {
    try {
        const { error, value } = courseValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        const data = await createCoursesService(req.body)
        return res.status(201).send({ status: "CREATED", data })
    } catch (err) {
        next(err)
    }
}

export const getAllCourses = async (req, res, next) => {
    try {
        const data = await getAllCoursesService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdCourses = async (req, res, next) => {
    try {
        const data = await getByIdCoursesService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateCourses = async (req, res, next) => {
    try {
        const updatedCourse = await updateCoursesService(
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

export const deleteCourses = async (req, res, next) => {
    try {
        const deleted = await deleteCoursesService(req.params.id)
        if (!deleted) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
