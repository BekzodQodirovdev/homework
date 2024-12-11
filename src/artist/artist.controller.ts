import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('get')
  getAll() {
    return this.artistService.getAllData();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistService.getOneData(id);
  }

  @Post('add')
  create(@Body() artistData: ArtistDto) {
    return this.artistService.createData(artistData);
  }
  @Put('update')
  update(@Param('id') id: string, @Body() data: ArtistDto) {
    return this.artistService.updateData(id, data);
  }
  @Delete('delete')
  delete(@Param('id') id: string) {
    return this.artistService.deleteData(id);
  }
}
