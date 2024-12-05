import { postService } from "../services/post.service.js"

export const commentController = {
    create: async (req, res, next) => {
        try {
            const data = req.body
            const result = await postService.create({
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
            const result = await postService.getAll()
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
            const result = await postService.getOne({ id: req.params.id })
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
            const result = await postService.update(req.params.id, req.body)
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
            const result = await postService.delete({ id: req.params.id })
            if (result.success) {
                return res.status(result.status).send(result.message)
            }
            res.status(result.status).send(result.message)
        } catch (error) {

            next(error)
        }
    },
}