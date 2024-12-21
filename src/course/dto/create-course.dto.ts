import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @Min(3)
  name: string;
  @IsString()
  @Min(5)
  @Max(70)
  description: string;
  @IsNumber()
  category_id: number;
}
