import { Router } from 'express'
import {
    getAllUsers,
    getOneUserById,
    createUsers,
    updateUsers,
    deleteUsers,
} from '../controller/index.js'

export const userRouter = Router()

userRouter.get('/all', getAllUsers)
userRouter.get('/all/:id', getOneUserById)
userRouter.post('/new', createUsers)
userRouter.put('/update/:id', updateUsers)
userRouter.delete('/delete/:id', deleteUsers)
