import { db } from "../database/index.js"

export const getAllExamService = () => {
    try {
        return db("exam").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdExamService = (id) => {
    try {
        return db("exam").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createExamService = (data) => {
    try {
        return db("exam")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateExamService = async (id, data) => {
    try {
        const updated = await db("exam")
            .where("id", "=", id)
            .update(data)
            .returning("*")
        return updated.length ? updated[0] : null
    } catch (error) {
        throw error
    }
}

export const deleteExamService = (id) => {
    try {
        return db("exam").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
