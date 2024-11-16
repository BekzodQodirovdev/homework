import pool from '../database/index.js'

export const getAllCategoriesService = async (query) => {
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        throw error
    }
}

export const getOneCategoriesByIdService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}

export const createCategoriesService = async (query, data) => {
    try {
        const { name, description, tag } = data
        const createData = await pool.query(query, [name, description, tag])
        console.log(createData.rows)
        return createData.rows
    } catch (error) {
        throw error
    }
}

export const updateCategoriesService = async (query, data, id) => {
    try {
        const { name, description, tag } = data
        const updateData = await pool.query(query, [name, description, tag, id])
        return updateData.rows
    } catch (error) {
        throw error
    }
}

export const deleteCategoriesService = async (query, id) => {
    try {
        const oneData = await pool.query(query, [id])
        return oneData.rows
    } catch (error) {
        throw error
    }
}
