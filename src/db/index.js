import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'postgres://postgres:bekzod123@localhost:5432/orm_vazifa',
)

try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

export default sequelize
