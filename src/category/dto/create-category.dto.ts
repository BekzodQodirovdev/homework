import { IsString, Min, Max } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Min(3)
  @Max(19)
  name: string;
  @IsString()
  @Min(5)
  @Max(80)
  description: string;
}
