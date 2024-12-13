import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  user_id: number;
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsNotEmpty()
  @MinLength(3)
  content: Text;
  @IsNotEmpty()
  slug: string;
}
