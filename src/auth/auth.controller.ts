import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() LoginAuthDto: LoginAuthDto) {
    return this.authService.login(LoginAuthDto);
  }

  @Get('verify/:id')
  verify(@Param('id') id: string) {
    
  }
}
