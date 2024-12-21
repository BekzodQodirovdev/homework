import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GropyService } from './gropy.service';
import { CreateGropyDto } from './dto/create-gropy.dto';
import { UpdateGropyDto } from './dto/update-gropy.dto';

@Controller('gropy')
export class GropyController {
  constructor(private readonly gropyService: GropyService) {}

  @Post()
  create(@Body() createGropyDto: CreateGropyDto) {
    return this.gropyService.create(createGropyDto);
  }

  @Get()
  findAll() {
    return this.gropyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gropyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGropyDto: UpdateGropyDto) {
    return this.gropyService.update(+id, updateGropyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gropyService.remove(+id);
  }
}
