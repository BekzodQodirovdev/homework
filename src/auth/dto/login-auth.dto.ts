import { IsEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsEmpty()
  email: string;

  @IsString()
  @IsEmpty()
  password: string;
}
