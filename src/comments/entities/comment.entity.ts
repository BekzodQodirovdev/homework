import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: number;
  @Prop()
  content: string;
  @Prop()
  post_id: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);