import { logger } from '../../utils/logger.js'
import pool from '../../database/index.js'

export const createCategoriesTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                description TEXT,
                tag VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        logger.info('Categories table created successfully.')
    } catch (error) {
        logger.error('Error creating Categories table:', error)
    }
}
