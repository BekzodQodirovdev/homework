import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  first_name: string;
  @IsString()
  @MinLength(3)
  last_name: string;
  @IsString()
  email: string;
  @IsString()
  passwordd: string;
}
