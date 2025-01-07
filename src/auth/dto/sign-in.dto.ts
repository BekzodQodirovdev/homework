import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';

export class SignInAuthDto {
  @ApiProperty({
    type: String,
    description: 'User Email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
  })
  @IsString()
  @Min(6)
  @Max(30)
  password: string;
}
