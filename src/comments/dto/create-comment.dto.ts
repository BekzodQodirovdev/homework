import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  user_id: number;
  @IsNotEmpty()
  @MinLength(3)
  content: string;
  @IsNotEmpty()
  post_id: number;
}
