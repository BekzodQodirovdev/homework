import { Inject, Injectable } from '@nestjs/common';
import { FavoritesDto } from './dto/create-favorites.dto';
import { Favorite } from './schema/create.schema';
import { FavoriteRepository } from './repository/favorite.repository';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('favoritRepo')
    private readonly favoritRepository: FavoriteRepository,
  ) {}

  async getAllData(): Promise<Favorite[]> {
    const favorites = await this.favoritRepository.getAllData();
    return favorites;
  }
  async getOneData(id: string): Promise<Favorite> {
    const favorite = await this.favoritRepository.getOneData(id);
    return favorite;
  }
  async createData(data: FavoritesDto): Promise<Favorite> {
    const newfavorite = await this.favoritRepository.createData(data);
    return newfavorite;
  }
  async updateData(id: string, data: FavoritesDto): Promise<Favorite> {
    const updatefavorite = await this.favoritRepository.updateData(id, data);
    return updatefavorite;
  }
  async deleteData(id: string): Promise<Favorite> {
    const deletefavorite = await this.favoritRepository.deleteData(id);
    return deletefavorite;
  }
}
