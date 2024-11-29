import { CommentsService } from "../service/index.js";

const responseHandler = function (c, result) {
    if(!result.success){
        return c.json({
            message: result.message
        }, result.status)
    }
    return c.json({
        message: result.message
    }, result.status)
}

export const CommentController = {
    create: async (c) => {
        try {
            const result = await CommentsService.create(c.req.body)
            responseHandler(c, result)
        } catch (error) {
            c.next(error)
        }
    },
    getAll: async (c) => {
        try {
            const page = c.req.query.page || 1
            const limit = c.req.query.limit || 10
            const result = await CommentsService.getAll(page, limit)
            responseHandler(c, result)
        } catch (error) {
            c.next(error)
        }
    },
    getOne: async (c) => {
        try {
            const id = c.req.params.id
            const result = await CommentsService.getOne(id)
            responseHandler(c, result)
        } catch (error) {
            c.next(error)
        }
    },
    update: async (c) => {
        try {
            const id = c.req.params.id
            const data = c.req.body
            const result = await CommentsService.update(id, data)
            responseHandler(c, result)
        } catch (error) {
            c.next(error)
        }
    },
    delete: async (c) => {
        try {
            const id = c.req.params.id
            const result = await CommentsService.delete(id)
            responseHandler(c, result)
        } catch (error) {
            c.next(error)
        }
    },
}