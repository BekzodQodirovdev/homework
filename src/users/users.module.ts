import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'userRepo',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
