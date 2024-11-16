import { logger } from '../../utils/logger.js'
import pool from '../../database/index.js'

export const createProductTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                category INTEGER REFERENCES categories(id) ON DELETE CASCADE,
                title VARCHAR,
                picture VARCHAR,
                summary VARCHAR,
                description VARCHAR,
                price REAL,
                discount_type VARCHAR,
                discount_value REAL,
                tags VARCHAR,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `)
    } catch (error) {
        logger.error(error)
    }
}
