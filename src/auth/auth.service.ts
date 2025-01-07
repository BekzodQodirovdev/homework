import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { SignInAuthDto } from './dto/sign-in.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MailService } from 'src/mail/mail.service';
import { AuthRepository } from './repository/auth.repository';
import * as bcrypt from 'bcrypt';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly jwtService: CustomJwtService,
    private authRepository: AuthRepository,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    const existingUser = await this.authRepository.findOneByEmail(
      signUpAuthDto.email,
    );
    return this.authRepository.create(signUpAuthDto);
  }

  async login(signInAuthDto: SignInAuthDto) {
    const user = await this.authRepository.findOneByEmail(signInAuthDto.email);
    if (!user) {
      throw new UnauthorizedException('Email topilmadi yoki parol xato');
    }
    const passwordMatch = await bcrypt.compare(
      signInAuthDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Email topilmadi yoki parol xato');
    }

    const tokens = this.jwtService.generateTokens(user);

    user.refreshtoken = await bcrypt.hash(tokens.refreshToken, 10);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
