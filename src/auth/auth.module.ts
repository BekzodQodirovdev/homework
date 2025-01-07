import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY || 'default-access-key',
      signOptions: { expiresIn: process.env.JWT_ACCESS_TIME || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [CustomJwtService, AuthService],
})
export class AuthModule {}
