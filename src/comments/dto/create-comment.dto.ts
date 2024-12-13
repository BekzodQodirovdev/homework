import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  user_id: number;
  @IsString()
  content: string;
  @IsNumber()
  post_id: number;
}
