import { Router } from 'express'
import {
    getAllAddressess,
    getOneAddressesById,
    createAddressess,
    updateAddressess,
    deleteAddressess,
} from '../controller/index.js'

export const addressesRouter = Router()

addressesRouter.get('/all', getAllAddressess)
addressesRouter.get('/all/:id', getOneAddressesById)
addressesRouter.post('/new', createAddressess)
addressesRouter.put('/update/:id', updateAddressess)
addressesRouter.delete('/delete/:id', deleteAddressess)
