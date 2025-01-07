import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { SignInAuthDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  Register(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.create(signUpAuthDto);
  }

  @Post('signin')
  Login(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.login(signInAuthDto);
  }
}
