import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerAuthDto } from './dto/register-auth.dto';
import { loginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerAuthDto: registerAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: loginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('profile')
  profile() {
    return this.authService.profile();
  }
}
