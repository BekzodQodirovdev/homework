import pool from '../database/index.js'

export const getAllProductsService = async (query) => {
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        throw error
    }
}

export const getOneProductsByIdService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}

export const createProductsService = async (query, data) => {
    try {
        const { name, description, tag } = data
        const createData = await pool.query(query, [name, description, tag])
        console.log(createData.rows)
        return createData.rows
    } catch (error) {
        throw error
    }
}

export const updateProductsService = async (query, data, id) => {
    try {
        const { name, description, tag } = data
        const updateData = await pool.query(query, [name, description, tag, id])
        return updateData.rows
    } catch (error) {
        throw error
    }
}

export const deleteProductsService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}
