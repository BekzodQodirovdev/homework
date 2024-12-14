import { IsString, IsEmail } from 'class-validator';

export class loginAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
