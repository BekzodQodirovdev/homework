import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from '../schema/create.schema';
import { FavoritesDto } from '../dto/create-favorites.dto';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectModel('favorites') private favoritesModel: Model<Favorite>,
  ) {}

  async getAllData(): Promise<Favorite[]> {
    const favorites = await this.favoritesModel.find();
    return favorites;
  }
  async getOneData(id: string): Promise<Favorite> {
    const favorite = await this.favoritesModel.findOne({ _id: id });
    return favorite;
  }
  async createData(data: FavoritesDto): Promise<Favorite> {
    const newfavorite = new this.favoritesModel(data);
    await newfavorite.save();
    return newfavorite;
  }
  async updateData(id: string, data: FavoritesDto): Promise<Favorite> {
    const updatefavorite = await this.favoritesModel.findByIdAndUpdate(
      { _id: id },
      data,
    );
    return updatefavorite;
  }
  async deleteData(id: string): Promise<Favorite> {
    const deletefavorite = await this.favoritesModel.findByIdAndDelete({
      _id: id,
    });
    return deletefavorite;
  }
}
