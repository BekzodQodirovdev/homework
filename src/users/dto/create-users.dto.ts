import { IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  version: number;
}
