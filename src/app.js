import {
    addressesRouter,
    categoriesRouter,
    productsRouter,
    socialFilesRouter,
    userRouter,
} from './routes/index.js'
import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import {
    createUserTable,
    createAddressesTable,
    createSotialProfilesTable,
    createCategoriesTable,
    createProductTable,
} from './schema/index.js'
config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/addresses', addressesRouter)
app.use('/api/v1/socialProfiles', socialFilesRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/products', productsRouter)

app.get('/setup', async (req, res) => {
    await createUserTable()
    await createAddressesTable()
    await createSotialProfilesTable()
    await createCategoriesTable()
    await createProductTable()
    res.send('Table created!.')
})

export default app
