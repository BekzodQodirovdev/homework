import {
    getAllTeacherService,
    getByIdTeacherService,
    createTeacherService,
    updateTeacherService,
    deleteTeacherService,
} from "../service/index.js"
import { teacherValidate } from "../validators/index.js"

export const createTeacher = async (req, res, next) => {
    try {
        const { error, value } = teacherValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        try {
            const data = await createTeacherService(req.body)
            return res.status(201).send({ status: "CREATED", data })
        } catch (err) {
            res.status(404).send({ status: "NOT FOUND" })
        }
    } catch (err) {
        next(err)
    }
}

export const getAllTeacher = async (req, res, next) => {
    try {
        const data = await getAllTeacherService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdTeacher = async (req, res, next) => {
    try {
        const data = await getByIdTeacherService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateTeacher = async (req, res, next) => {
    try {
        const { user_id } = req.body
        const oldTeacher = await getByIdTeacherService(req.params.id)
        if (!oldTeacher) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        try {
            const data = await updateTeacherService(req.params.id, user_id)
            res.status(202).send({ status: "UPDATED" })
        } catch (err) {
            res.status(404).send({ status: "NOT FOUND" })
        }
    } catch (err) {
        next(err)
    }
}

export const deleteTeacher = async (req, res, next) => {
    try {
        const oldTeacher = await getByIdTeacherService(req.params.id)
        if (!oldTeacher) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        const data = await deleteTeacherService(req.params.id)
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
