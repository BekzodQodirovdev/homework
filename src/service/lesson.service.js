import { db } from "../database/index.js"

export const getAllLessonService = () => {
    try {
        return db("lesson").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdLessonService = (id) => {
    try {
        return db("lesson").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createLessonService = (data) => {
    try {
        return db("lesson")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateLessonService = async (id, data) => {
    try {
        const updated = await db("lesson")
            .where("id", "=", id)
            .update(data)
            .returning("*")
        return updated.length ? updated[0] : null
    } catch (error) {
        throw error
    }
}

export const deleteLessonService = (id) => {
    try {
        return db("lesson").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
