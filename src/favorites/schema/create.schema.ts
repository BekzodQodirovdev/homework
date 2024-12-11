import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite {
  @Prop({ required: true })
  artists: string[];

  @Prop({ required: true })
  albums: string[];

  @Prop({ required: true })
  tracks: string[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
