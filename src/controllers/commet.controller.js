import { commentService } from "../services/commet.service.js"

export const commentController = {
    create: async (req, res, next) => {
        try {
            const data = req.body
            const result = await commentService.create({
                ...data,
            })
            if (result.success) {
                return res.status(result.status).send("Creted: " + result.message)
            } else {
                return res.status(result.status).send("Barchasini to'ldiring")
            }
        } catch (error) {

            next(error)
        }
    },
    getAll: async (req, res, next) => {
        try {
            const result = await commentService.getAll()
            if (result.success) {
                return res.status(result.status).send(result.message)
            }
            res.status(result.status).send(result.message)
        } catch (error) {

            next(error)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const result = await commentService.getOne({ id: req.params.id })
            if (result.success) {
                return res.status(result.status).send(result.message)
            }
            res.status(result.status).send(result.message)
        } catch (error) {

            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const result = await commentService.update(req.params.id, req.body)
            if (result.success) {
                return res.status(result.status).send(result.message)
            }
            res.status(result.status).send(result.message)
        } catch (error) {

            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const result = await commentService.delete({ id: req.params.id })
            if (result.success) {
                return res.status(result.status).send(result.message)
            }
            res.status(result.status).send(result.message)
        } catch (error) {

            next(error)
        }
    },
}