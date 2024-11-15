import pool from '../database/index.js'

export const getAllAddressesService = async (query) => {
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        throw error
    }
}

export const getOneAddressesByIdService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}

export const createAddressessService = async (query, data) => {
    try {
        const {
            user_id,
            title,
            created_at,
            address_line_1,
            address_line_2,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
        } = data
        const createData = await pool.query(query, [
            user_id,
            title,
            created_at,
            address_line_1,
            address_line_2,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
        ])
        console.log(createData.rows)
        return createData.rows
    } catch (error) {
        throw error
    }
}

export const updateAddressessService = async (query, data, id) => {
    try {
        const {
            user_id,
            title,
            created_at,
            address_line_1,
            address_line_2,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
        } = data
        const updateData = await pool.query(query, [
            user_id,
            title,
            created_at,
            address_line_1,
            address_line_2,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
            id,
        ])
        return updateData.rows
    } catch (error) {
        throw error
    }
}

export const deleteAddressesService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}
