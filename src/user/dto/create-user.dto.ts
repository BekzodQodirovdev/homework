import { IsEmail, IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(10, { message: 'Fullname must be at least 10 characters long' })
  fullname: string;

  @IsString()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsPhoneNumber(null, { message: 'Phone must be a valid phone number' })
  phone: string;
}
