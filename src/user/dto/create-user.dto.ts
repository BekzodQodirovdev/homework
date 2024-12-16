import { IsString, IsEmpty, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsString()
  @IsEmpty()
  email: string;

  @IsString()
  @IsEmpty()
  password: string;
}
