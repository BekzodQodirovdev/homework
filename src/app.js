import {
    addressesRouter,
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
} from './schema/index.js'
config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', addressesRouter)
app.use('/api/v1/socialProfiles', socialFilesRouter)

app.get('/setup', async (req, res) => {
    await createUserTable()
    await createAddressesTable()
    await createSotialProfilesTable()
    res.send('Table created!.')
})

export default app
