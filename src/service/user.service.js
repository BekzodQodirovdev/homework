import pool from '../database/index.js'

export const getAllUserService = async (query) => {
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        throw error
    }
}

export const getOneUserByIdService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}

export const createUsersService = async (query, data) => {
    try {
        const {
            name,
            email,
            password,
            avatar,
            username,
            birth_of_date,
            phone_number,
        } = data
        const createData = await pool.query(query, [
            name,
            email,
            password,
            avatar,
            username,
            birth_of_date,
            phone_number,
        ])
        console.log(createData.rows)
        return createData.rows
    } catch (error) {
        throw error
    }
}

export const updateUsersService = async (query, data, id) => {
    try {
        const {
            name,
            email,
            password,
            avatar,
            username,
            birth_of_date,
            phone_number,
        } = data
        const updateData = await pool.query(query, [
            name,
            email,
            password,
            avatar,
            username,
            birth_of_date,
            phone_number,
            id,
        ])
        return updateData.rows
    } catch (error) {
        throw error
    }
}

export const deleteUserService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}
