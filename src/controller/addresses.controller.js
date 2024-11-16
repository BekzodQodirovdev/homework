import {
    getAllAddressesService,
    getOneAddressesByIdService,
    createAddressessService,
    updateAddressessService,
    deleteAddressesService,
} from '../service/index.js'

export const getAllAddressess = async (req, res, next) => {
    try {
        const allAddressess = await getAllAddressesService('SELECT * FROM addresses')
        res.status(200).send({ status: 'ok', data: allAddressess })
    } catch (error) {
        next(error)
    }
}

export const getOneAddressesById = async (req, res, next) => {
    try {
        const oneAddresses = await getOneAddressesByIdService(
            'SELECT * FROM addresses WHERE id = $1',
            req.params.id
        )
        res.status(200).send({ status: 'ok', data: oneAddresses })
    } catch (error) {
        next(error)
    }
}


export const createAddressess = async (req, res, next) => {
    try {
        const createAddresses = await createAddressessService(
            'INSERT INTO addresses (user_id, title, created_at, address_line_1, address_line_2, country, city, postal_code, phone_number, landmark) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10);',
            req.body
        )

        res.status(201).send({ status: 'Created', data: createAddresses })
    } catch (error) {
        next(error)
    }
}

export const updateAddressess = async (req, res, next) => {
    try {
        const updatedata = await updateAddressessService(
            'UPDATE addresses SET user_id = $1, title = $2, created_at = $3, address_line_1 = $4, address_line_2 = $5, country = $6, city = $7, postal_code = $8, phone_number = $9, landmark = $10, WHERE id = $11',
            req.body,
            req.params.id
        )
        res.status(202).send({ status: 'Updated', data: updatedata })
    } catch (error) {
        next(error)
    }
}

export const deleteAddressess = async (req, res, next) => {
    try {
        const deleteAddresses = await deleteAddressesService(
            'DELETE FROM addresses WHERE id = $1',
            req.params.id
        )
        res.status(203).send({ status: 'deleted', data: deleteAddresses })
    } catch (error) {
        next(error)
    }
}
