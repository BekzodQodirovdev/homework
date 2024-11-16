import { Router } from 'express'
import {
    getAllCategories,
    getOneCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories,
} from '../controller/index.js'

export const categoriesRouter = Router()

categoriesRouter.get('/all', getAllCategories)
categoriesRouter.get('/all/:id', getOneCategoriesById)
categoriesRouter.post('/new', createCategories)
categoriesRouter.put('/update/:id', updateCategories)
categoriesRouter.delete('/delete/:id', deleteCategories)
