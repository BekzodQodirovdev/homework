import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoriteSchema } from './schema/create.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteRepository } from './repository/favorite.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'favorites', schema: FavoriteSchema }]),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'favoritRepo',
      useClass: FavoriteRepository,
    },
  ],
})
export class FavoritesModule {}
