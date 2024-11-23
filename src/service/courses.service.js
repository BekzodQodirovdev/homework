import { db } from "../database/index.js"

export const getAllCoursesService = () => {
    try {
        return db("courses").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdCoursesService = (id) => {
    try {
        return db("courses").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createCoursesService = (data) => {
    try {
        return db("courses")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateCoursesService = async (id, data) => {
    try {
        const updated = await db("courses")
            .where("id", "=", id)
            .update(data)
            .returning("*")
        return updated.length ? updated[0] : null
    } catch (error) {
        throw error
    }
}

export const deleteCoursesService = (id) => {
    try {
        return db("courses").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
