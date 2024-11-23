import {
    getAllStudentService,
    getByIdStudentService,
    createStudentService,
    updateStudentService,
    deleteStudentService,
} from "../service/index.js"
import { studentValidate } from "../validators/index.js"

export const createStudent = async (req, res, next) => {
    try {
        const { error, value } = studentValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        try {
            const data = await createStudentService(req.body)
            return res.status(201).send({ status: "CREATED", data })
        } catch (err) {
            res.status(404).send({ status: "NOT FOUND" })
        }
    } catch (err) {
        next(err)
    }
}

export const getAllStudent = async (req, res, next) => {
    try {
        const data = await getAllStudentService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdStudent = async (req, res, next) => {
    try {
        const data = await getByIdStudentService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateStudent = async (req, res, next) => {
    try {
        const { user_id } = req.body
        const oldStudent = await getByIdStudentService(req.params.id)
        if (!oldStudent) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        try {
            const data = await updateStudentService(req.params.id, user_id)
            res.status(202).send({ status: "UPDATED" })
        } catch (err) {
            res.status(404).send({ status: "NOT FOUND" })
        }
    } catch (err) {
        next(err)
    }
}

export const deleteStudent = async (req, res, next) => {
    try {
        const oldStudent = await getByIdStudentService(req.params.id)
        if (!oldStudent) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        const data = await deleteStudentService(req.params.id)
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
