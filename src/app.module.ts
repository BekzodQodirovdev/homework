import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.PG_HOST || 'postgres-db',
      port: +env.PG_PORT || 5432,
      username: env.PG_USER || 'postgres',
      password: env.PG_PASSWORD || 'postgres',
      database: env.PG_DB || 'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
