import { db } from "../database/index.js"

export const getAllHomeworkService = () => {
    try {
        return db("homework").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdHomeworkService = (id) => {
    try {
        return db("homework").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createHomeworkService = (data) => {
    try {
        return db("homework")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateHomeworkService = async (id, data) => {
    try {
        const updated = await db("homework")
            .where("id", "=", id)
            .update(data)
            .returning("*")
        return updated.length ? updated[0] : null
    } catch (error) {
        throw error
    }
}

export const deleteHomeworkService = (id) => {
    try {
        return db("homework").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
