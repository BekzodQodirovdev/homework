import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistSchema } from './schema/create.schema';
import { ArtistRepository } from './repository/artist.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'artists', schema: ArtistSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService,
    {
      provide: 'artistRepo',
      useClass: ArtistRepository
    }
  ],
})
export class ArtistModule {}
