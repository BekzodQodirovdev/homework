import { Injectable, NotFoundException } from '@nestjs/common';
import { registerAuthDto } from './dto/register-auth.dto';
import { loginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private usersModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthDto: registerAuthDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createAuthDto.passwordd, saltOrRounds);
    const dataUpdate = { ...createAuthDto, password: hash };
    return new this.usersModel(dataUpdate);
  }
  async login(loginAuthDto: loginAuthDto) {
    const currentUser = await this.usersModel.findOne({
      email: loginAuthDto.email,
    });
    if (!currentUser) {
      throw new NotFoundException('Email yoki Password xato');
    }
    const isMatch = await bcrypt.compare(
      loginAuthDto.password,
      currentUser.password,
    );
    if (!isMatch) {
      throw new NotFoundException('Email yoki Password xato');
    }
    const payload = { sub: currentUser._id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  profile(id: string) {
    return this.usersModel.findOne({ _id: id });
  }
}
