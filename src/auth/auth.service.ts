import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compairePassword } from 'src/hashed/hashpassword';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async register(
    RegisterAuthDto: RegisterAuthDto,
  ): Promise<Omit<CreateUserDto, 'password'>> {
    const currentUser = await this.UserService.findByEmail(
      RegisterAuthDto.email,
    );
    if (currentUser) {
      throw new ConflictException('Bunday user mavjud');
    }
    const user = await this.UserService.create(RegisterAuthDto);
    return user;
  }

  async login(LoginAuthDto: LoginAuthDto) {
    const { email, password } = LoginAuthDto;
    const currentUser = await this.UserService.findByEmail(email);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    const passwordCheked = await compairePassword(
      password,
      currentUser.password,
    );

    if (!passwordCheked) {
      throw new NotFoundException('User not found');
    }
    const OTP_CODE = 123;
    this.emailService.otpSend(email, `Your otp code:  ${OTP_CODE}`);

    const payload = {
      sub: currentUser.email,
      name: currentUser.name,
      role: currentUser.role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_EXPIRES_IN,
      }),
    ]);
    return { access_token, refresh_token };
  }
  async verify(otp_code) {}
}
