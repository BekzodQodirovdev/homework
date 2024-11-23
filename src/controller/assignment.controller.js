import {
    getAllAssignmentService,
    getByIdAssignmentService,
    createAssignmentService,
    updateAssignmentService,
    deleteAssignmentService,
} from "../service/index.js"
import { assignmentValidate } from "../validators/index.js"

export const createAssignment = async (req, res, next) => {
    try {
        const { error, value } = assignmentValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        const data = await createAssignmentService(req.body)
        return res.status(201).send({ status: "CREATED", data })
    } catch (err) {
        next(err)
    }
}

export const getAllAssignment = async (req, res, next) => {
    try {
        const data = await getAllAssignmentService()
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdAssignment = async (req, res, next) => {
    try {
        const data = await getByIdAssignmentService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateAssignment = async (req, res, next) => {
    try {
        const updatedassignment = await updateAssignmentService(
            req.params.id,
            req.body,
        )
        if (!updatedassignment) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(202).send({ status: "UPDATED", data: updatedassignment })
    } catch (err) {
        next(err)
    }
}

export const deleteAssignment = async (req, res, next) => {
    try {
        const deleted = await deleteAssignmentService(req.params.id)
        if (!deleted) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
