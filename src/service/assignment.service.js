import { db } from "../database/index.js"

export const getAllAssignmentService = () => {
    try {
        return db("assignment").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdAssignmentService = (id) => {
    try {
        return db("assignment").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createAssignmentService = (data) => {
    try {
        return db("assignment")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateAssignmentService = async (id, data) => {
    try {
        const updated = await db("assignment")
            .where("id", "=", id)
            .update(data)
            .returning("*")
        return updated.length ? updated[0] : null
    } catch (error) {
        throw error
    }
}

export const deleteAssignmentService = (id) => {
    try {
        return db("assignment").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
