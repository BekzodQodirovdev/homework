import { Comment } from "../models/commet.js"


export const commentService = {
    create: async (data) => {
        try {
            const result = await Comment.create({
                ...data,
            })
            return {
                success: true,
                status: 200,
                message: result,
            }
        } catch (error) {
            next(error)
        }
    },
    getAll: async () => {
        try {
            const result = await Comment.getAll()
            if (!result) {
                return {
                    success: true,
                    status: 200,
                    message: "Malumotlar yo'q",
                }
            }
            return {
                success: true,
                status: 200,
                message: result,
            }
        } catch (error) {
            next(error)
        }
    },
    getOne: async (data) => {
        try {
            const result = await Comment.getOne({ id: data })
            if (!result) {
                return {
                    success: true,
                    status: 200,
                    message: "Malumotlar yo'q",
                }
            }
            return {
                success: true,
                status: 200,
                message: result,
            }
        } catch (error) {
            next(error)
        }
    },
    update: async (id, data) => {
        try {
            const result = await Comment.getOne({ id })
            if (!result) {
                return {
                    success: true,
                    status: 200,
                    message: "Bunday comment yo'q",
                }
            }
            const newData = {
                ...result,
                ...data
            }
            const updataData = await Comment.update(newData)
            return {
                success: true,
                status: 200,
                message: updataData,
            }
        } catch (error) {
            next(error)
        }
    },
    delete: async (id) => {
        try {
            const result = await Comment.getOne({ id })
            if (!result) {
                return {
                    success: true,
                    status: 200,
                    message: "Bunday comment yo'q",
                }
            }
            const deleteData = await Comment.delete({ id })
            return {
                success: true,
                status: 200,
                message: "deleted",
            }
        } catch (error) {
            next(error)
        }
    },
}