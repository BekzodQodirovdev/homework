import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), CustomJwtService, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
