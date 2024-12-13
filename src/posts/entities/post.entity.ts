import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: number;
  @Prop()
  title: string;
  @Prop()
  content: Text;
  @Prop()
  slug: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
