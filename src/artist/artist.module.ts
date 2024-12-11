import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistSchema } from './schema/create.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'artists', schema: ArtistSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
