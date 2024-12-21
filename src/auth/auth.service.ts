import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { compairePassword, hashPassword } from 'src/hashed/hashpassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly userReposity: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    let hashPass = await hashPassword(signUpAuthDto.password);
    let updateData = { ...signUpAuthDto, password: hashPass };
    return this.userReposity.create(updateData);
  }

  async login(signInAuthDto: SignInAuthDto) {
    const userData = await this.userReposity.findByUsername(
      signInAuthDto.username,
    );
    if (!userData) {
      throw new NotFoundException('Email yoki Password xato');
    }
    let passwordCheked = await compairePassword(
      signInAuthDto.password,
      userData.password,
    );
    if (!passwordCheked) {
      throw new NotFoundException('Email yoki Password xato');
    }
    const payload = {
      sub: userData.id,
      name: userData.name,
      role: userData.role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);
    return { access_token, refresh_token };
  }

  findAll() {
    return this.userReposity.findAll();
  }

  findOne(id: number) {
    return this.userReposity.findOne(id);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.userReposity.update(id, updateAuthDto);
  }

  remove(id: number) {
    return this.userReposity.remove(id);
  }
}
