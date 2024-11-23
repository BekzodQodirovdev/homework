import { db } from "../database/index.js"

export const getAllStudentService = () => {
    try {
        return db("students").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdStudentService = (id) => {
    try {
        return db("students").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createStudentService = (data) => {
    try {
        return db("students")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateStudentService = (id, data) => {
    try {
        return db("students").where("id", "=", id).update(data)
    } catch (error) {
        throw error
    }
}

export const deleteStudentService = (id) => {
    try {
        return db("students").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
