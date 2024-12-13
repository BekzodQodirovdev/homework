import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './schema/create.schema';
import { ArtistDto } from './dto/create-artist.dto';
import { ArtistRepository } from './repository/artist.repository';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('artistRepo')
    private readonly favoritRepository: ArtistRepository,
  ) {}
  async getAllData(): Promise<Artist[]> {
    const artists = await this.favoritRepository.getAllData();
    return artists;
  }
  async getOneData(id: string): Promise<Artist> {
    const artist = await this.favoritRepository.getOneData(id);
    return artist;
  }
  async createData(data: ArtistDto): Promise<Artist> {
    const newartist = await this.favoritRepository.createData(data);
    return newartist;
  }
  async updateData(id: string, data: ArtistDto): Promise<Artist> {
    const updateartist = await this.favoritRepository.updateData(id, data);
    return updateartist;
  }
  async deleteData(id: string): Promise<Artist> {
    const deleteartist = await this.favoritRepository.deleteData(id);
    return deleteartist;
  }
}
