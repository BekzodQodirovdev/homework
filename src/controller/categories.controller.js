import { z } from 'zod'
import {
    getAllCategoriesService,
    getOneCategoriesByIdService,
    createCategoriesService,
    updateCategoriesService,
    deleteCategoriesService,
} from '../service/index.js'
import { categoryCheck } from '../validations/categories.validations.js'

export const getAllCategories = async (req, res, next) => {
    try {
        const allCategories = await getAllCategoriesService(
            'SELECT * FROM categories'
        )
        res.status(200).send({ status: 'ok', data: allCategories })
    } catch (error) {
        next(error)
    }
}

export const getOneCategoriesById = async (req, res, next) => {
    try {
        const oneCategories = await getOneCategoriesByIdService(
            'SELECT * FROM categories WHERE id = $1',
            req.params.id
        )
        res.status(200).send({ status: 'ok', data: oneCategories })
    } catch (error) {
        next(error)
    }
}

export const createCategories = async (req, res, next) => {
    try {
        const valid = categoryCheck.parse(req.body)

        const createCategoriesData = await createCategoriesService(
            'INSERT INTO categories (name, description, tag) VALUES ($1,$2,$3);',
            valid
        )
        res.status(201).send({ status: 'Created', data: createCategoriesData })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({
                status: 'error',
                message: error.errors.map((err) => err.message),
            })
        }
        next(error)
    }
}

export const updateCategories = async (req, res, next) => {
    try {
        const valid = categoryCheck.parse(req.body)

        const updatedata = await updateCategoriesService(
            'UPDATE categories SET name = $1, description = $2, tag = $3, WHERE id = $4',
            valid,
            req.params.id
        )
        res.status(202).send({ status: 'Updated', data: updatedata })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({
                status: 'error',
                message: error.errors.map((err) => err.message),
            })
        }
        next(error)
    }
}

export const deleteCategories = async (req, res, next) => {
    try {
        const deleteCategories = await deleteCategoriesService(
            'DELETE FROM categories WHERE id = $1',
            req.params.id
        )
        res.status(203).send({ status: 'deleted', data: deleteCategories })
    } catch (error) {
        next(error)
    }
}
