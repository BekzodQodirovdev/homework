import { Gender } from 'src/enum/gender';
import { IsString, Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpAuthDto {
  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'John',
  })
  @IsString()
  @Min(3)
  @Max(30)
  name: string;

  @ApiProperty({
    type: String,
    description: 'User Email',
    example: 'john@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
    example: 'Joh!12',
  })
  @IsString()
  @Min(6)
  @Max(30)
  password: string;

  @ApiProperty({
    type: Number,
    description: 'User age',
    example: 20,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    description: 'User gender',
    enum: [...Object.values(Gender)],
  })
  gender: Gender;
}
