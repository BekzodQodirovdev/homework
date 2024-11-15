import { logger } from '../../utils/logger.js'
import pool from '../../database/index.js'

export const createAddressesTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255),
                created_at TIMESTAMPTZ DEFAULT NOW(),
                address_line_1 VARCHAR(255),
                address_line_2 VARCHAR(255),
                country VARCHAR(100),
                city VARCHAR(100),
                postal_code VARCHAR(30),
                phone_number VARCHAR(30),
                landmark VARCHAR(255)
            );
        `)
    } catch (error) {
        logger.error(error)
    }
}
