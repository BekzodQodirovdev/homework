import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from './schema/create.schema';
import { ArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(@InjectModel('favorites') private artistsModel: Model<Artist>) {}

  async getAllData(): Promise<Artist[]> {
    const artists = await this.artistsModel.find();
    return artists;
  }
  async getOneData(id: string): Promise<Artist> {
    const artist = await this.artistsModel.findOne({ _id: id });
    return artist;
  }
  async createData(data: ArtistDto): Promise<Artist> {
    const newartist = new this.artistsModel(data);
    await newartist.save();
    return newartist;
  }
  async updateData(id: string, data: ArtistDto): Promise<Artist> {
    const updateartist = await this.artistsModel.findByIdAndUpdate(
      { _id: id },
      data,
    );
    return updateartist;
  }
  async deleteData(id: string): Promise<Artist> {
    const deleteartist = await this.artistsModel.findByIdAndDelete({ _id: id });
    return deleteartist;
  }
}
