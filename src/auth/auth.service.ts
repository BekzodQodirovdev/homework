import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { SignInAuthDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { CustomJwtService } from '../custom-jwt/custom-jwt.service';
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
    const existingUser = await this.authRepository.findOneBy({
      email: signUpAuthDto.email,
    });
    if (existingUser) {
      throw new UnauthorizedException('Bunday email mavjud');
    }

    const hashedPassword = await bcrypt.hash(signUpAuthDto.password, 10);
    const newUser = this.authRepository.create({
      ...signUpAuthDto,
      password: hashedPassword,
    });

    return await this.authRepository.save(newUser);
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

    user.refreshtoken = tokens.refreshToken;

    await this.authRepository.save(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
