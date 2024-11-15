import {
    getAllUserService,
    getOneUserByIdService,
    createUsersService,
    updateUsersService,
    deleteUserService,
} from '../service/index.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await getAllUserService('SELECT * FROM users')
        res.status(200).send({ status: 'ok', data: allUsers })
    } catch (error) {
        next(error)
    }
}

export const getOneUserById = async (req, res, next) => {
    try {
        const oneUser = await getOneUserByIdService(
            'SELECT * FROM users WHERE id = $1',
            req.params.id
        )
        res.status(200).send({ status: 'ok', data: oneUser })
    } catch (error) {
        next(error)
    }
}

export const createUsers = async (req, res, next) => {
    try {
        const createUser = await createUsersService(
            'INSERT INTO users (name, email, password, avatar, username, birth_of_date, phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7);',
            req.body
        )

        res.status(201).send({ status: 'Created', data: createUser })
    } catch (error) {
        next(error)
    }
}

export const updateUsers = async (req, res, next) => {
    try {
        const updatedata = await updateUsersService(
            'UPDATE users SET name = $1, email = $2, password = $3, avatar = $4, username = $5, birth_of_date = $6, phone_number = $7 WHERE id = $8',
            req.body,
            req.params.id
        )
        res.status(202).send({ status: 'Updated', data: updatedata })
    } catch (error) {
        next(error)
    }
}

export const deleteUsers = async (req, res, next) => {
    try {
        const deleteUser = await deleteUserService(
            'DELETE FROM users WHERE id = $1',
            req.params.id
        )
        res.status(203).send({ status: 'deleted', data: deleteUser })
    } catch (error) {
        next(error)
    }
}
