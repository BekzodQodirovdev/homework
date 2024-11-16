import { Router } from 'express'
import {
    getAllProducts,
    getOneProductsById,
    createProducts,
    updateProducts,
    deleteProducts,
} from '../controller/index.js'

export const productsRouter = Router()

productsRouter.get('/all', getAllProducts)
productsRouter.get('/all/:id', getOneProductsById)
productsRouter.post('/new', createProducts)
productsRouter.put('/update/:id', updateProducts)
productsRouter.delete('/delete/:id', deleteProducts)
