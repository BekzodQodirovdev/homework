import { IsEmail, IsString, MinLength } from 'class-validator';

export class registerAuthDto {
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  passwordd: string;
}
