import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize(
    'postgres://postgres:postgres@localhost:5432/orm_test',
)

try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

// =================== 1 ==================
// const User = sequelize.define(
//   'User',
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//   },
//   {
//     // Other model options go here
//   },
// );

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// =================== 2 ==================
class User extends Model {}

User.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    },
)

// the defined model is the class itself
// console.log(User === sequelize.models.User) // true

// const user = new User({ firstName: 'bekzodbek', lastName: 'Qodirov' })

// console.log(user)

// user.save()

//   ; (async () => {
//     await sequelize.sync({ force: false });false
//     // Code here
//   })()

// const users = await User.findAll({
//   where: {
//     id: {
//       [Op.eq]: 1
//     }
//   }
// })
// console.log(users);

const users = await User.findByPk(2)
console.log(users)
