import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ImageKitModule } from 'imagekit-nestjs';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ImageKitConfig } from './configs/imagekit.config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { GropyModule } from './gropy/gropy.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files',
    }),
    ImageKitModule.forRootAsync({
      useFactory: ImageKitConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    CourseModule,
    GropyModule,
  ],
})
export class AppModule {}
