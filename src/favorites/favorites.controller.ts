import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesDto } from './dto/create-favorites.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get('get')
  getAll() {
    return this.favoriteService.getAllData();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.favoriteService.getOneData(id);
  }

  @Post('add')
  create(@Body() favoriteData: FavoritesDto) {
    return this.favoriteService.createData(favoriteData);
  }
  @Put('update')
  update(@Param('id') id: string, @Body() data: FavoritesDto) {
    return this.favoriteService.updateData(id, data);
  }
  @Delete('delete')
  delete(@Param('id') id: string) {
    return this.favoriteService.deleteData(id);
  }
}
