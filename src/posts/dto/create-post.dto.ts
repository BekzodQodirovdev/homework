import { IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  user_id: number;
  @IsString()
  title: string;
  @IsString()
  content: Text;
  @IsString()
  slug: string;
}
