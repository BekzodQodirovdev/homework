import { z } from 'zod'
import {
    getAllProductsService,
    getOneProductsByIdService,
    createProductsService,
    updateProductsService,
    deleteProductsService,
} from '../service/index.js'
import { productCheck } from '../validations/products.validations.js'

export const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await getAllProductsService(
            'SELECT * FROM products'
        )
        res.status(200).send({ status: 'ok', data: allProducts })
    } catch (error) {
        next(error)
    }
}

export const getOneProductsById = async (req, res, next) => {
    try {
        const oneProducts = await getOneProductsByIdService(
            'SELECT * FROM products WHERE id = $1',
            req.params.id
        )
        res.status(200).send({ status: 'ok', data: oneProducts })
    } catch (error) {
        next(error)
    }
}

export const createProducts = async (req, res, next) => {
    try {
        const valid = productCheck.parse(req.body)
        const createProductsData = await createProductsService(
            'INSERT INTO products (name, description, tag) VALUES ($1,$2,$3);',
            valid
        )

        res.status(201).send({ status: 'Created', data: createProductsData })
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

export const updateProducts = async (req, res, next) => {
    try {
        const valid = productCheck.parse(req.body)

        const updatedata = await updateProductsService(
            'UPDATE products SET name = $1, description = $2, tag = $3, WHERE id = $4',
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

export const deleteProducts = async (req, res, next) => {
    try {
        const deleteProducts = await deleteProductsService(
            'DELETE FROM products WHERE id = $1',
            req.params.id
        )
        res.status(203).send({ status: 'deleted', data: deleteProducts })
    } catch (error) {
        next(error)
    }
}
