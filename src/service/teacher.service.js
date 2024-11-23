import { db } from "../database/index.js"

export const getAllTeacherService = () => {
    try {
        return db("teachers").select("*")
    } catch (error) {
        throw error
    }
}

export const getByIdTeacherService = (id) => {
    try {
        return db("teachers").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const createTeacherService = (data) => {
    try {
        return db("teachers")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateTeacherService = (id, data) => {
    try {
        return db("teachers").where("id", "=", id).update(data)
    } catch (error) {
        throw error
    }
}

export const deleteTeacherService = (id) => {
    try {
        return db("teachers").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
