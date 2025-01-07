import { Sequelize } from 'sequelize-typescript';
import { Auth } from 'src/auth/entities/auth.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'bekzod123',
        database: 'postgres',
      });
      sequelize.addModels([Auth]);
      await sequelize.sync({
        force: true,
      });

      return sequelize;
    },
  },
];
