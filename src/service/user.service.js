import { db } from "../database/index.js"

export const getAllUserService = (page, limit) => {
    try {
        return db("users").select("*").limit(limit).offset(page)
    } catch (error) {
        throw error
    }
}

export const getByIdUserService = (id) => {
    try {
        return db("users").select("*").where("id", "=", id).first()
    } catch (error) {
        throw error
    }
}

export const getByEmailUserService = (email) => {
    try {
        return db("users").select("*").where("email", "=", email).first()
    } catch (error) {
        throw error
    }
}

export const createUserService = (data) => {
    try {
        return db("users")
            .insert({ ...data })
            .returning("*")
    } catch (error) {
        throw error
    }
}

export const updateUserService = (id, data) => {
    try {
        return db("users").where("id", "=", id).update(data)
    } catch (error) {
        throw error
    }
}

export const deleteUserService = (id) => {
    try {
        return db("users").where("id", "=", id).del()
    } catch (error) {
        throw error
    }
}
