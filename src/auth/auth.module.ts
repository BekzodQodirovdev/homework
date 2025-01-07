import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtModule } from 'src/custom-jwt/custom-jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    MailModule,
    CustomJwtModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY || 'default-access-key',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TIME || '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
