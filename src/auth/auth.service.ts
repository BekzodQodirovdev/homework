import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { SignInAuthDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly jwtService: CustomJwtService,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    const existingUser = await this.authRepository.findOne({
      where: { email: signUpAuthDto.email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Bunday email mavjud');
    }
    return this.authRepository.create(signUpAuthDto);
  }

  async login(signInAuthDto: SignInAuthDto) {
    const user = await this.authRepository.findOne({
      where: { email: signInAuthDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Email yoki parol xato');
    }
    const passwordMatch = await bcrypt.compare(
      signInAuthDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Email yoki parol xato');
    }

    const tokens = this.jwtService.generateTokens(user);

    user.refreshtoken = await bcrypt.hash(tokens.refreshToken, 10);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
