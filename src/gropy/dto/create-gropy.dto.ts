import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateGropyDto {
  @IsString()
  @Min(3)
  @Max(19)
  name: string;
  @IsString()
  @Min(3)
  @Max(70)
  description: string;
  @IsNumber()
  course_id: number;
  @IsNumber()
  price: number;
  @IsDate()
  start_date: Date;
  @IsString()
  room: string;
  @IsDate()
  end_date: Date;
  @IsString()
  students: string;
  @IsString()
  @Min(3)
  @Max(19)
  teacher: string;
}
