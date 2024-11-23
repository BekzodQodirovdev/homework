import {
    getAllUserService,
    getByIdUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    getByEmailUserService,
} from "../service/index.js"
import { userValidate } from "../validators/index.js"

export const createUser = async (req, res, next) => {
    try {
        const { error, value } = userValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }
        const userFind = await getByEmailUserService(req.body.email)
        if (!userFind) {
            const data = await createUserService(req.body)
            return res.status(201).send({ status: "CREATED", data })
        }
        res.status(409).send({ status: "DUBLIKAT EMAIL" })
    } catch (err) {
        next(err)
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit
        const data = await getAllUserService(skip, limit)
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdUser = async (req, res, next) => {
    try {
        const data = await getByIdUserService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const oldUser = await getByIdUserService(req.params.id)
        if (!oldUser) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        const newData = { ...oldUser, ...req.body }
        const data = await updateUserService(req.params.id, newData)
        res.status(202).send({ status: "UPDATED" })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const oldUser = await getByIdUserService(req.params.id)
        if (!oldUser) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        const data = await deleteUserService(req.params.id)
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
