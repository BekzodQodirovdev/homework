import { Post } from "../models/post.js"


export const postService = {
    create: async (data) => {
        try {
            const result = await Post.create({
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
            const result = await Post.getAll()
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
            const result = await Post.getOne({ id: data })
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
            const result = await Post.getOne({ id })
            if (!result) {
                return {
                    success: true,
                    status: 200,
                    message: "Bunday Post yo'q",
                }
            }
            const newData = {
                ...result,
                ...data
            }
            const updataData = await Post.update(newData)
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
            const result = await Post.getOne({ id })
            if (!result) {
                return {
                    success: true,
                    status: 200,
                    message: "Bunday Post yo'q",
                }
            }
            const deleteData = await Post.delete({ id })
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