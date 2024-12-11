import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-tests'),
    UsersModule,
    ArtistModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
