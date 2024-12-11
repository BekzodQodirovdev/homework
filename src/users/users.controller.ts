import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('get')
  getAll() {
    return this.userService.getAllData();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOneData(id);
  }

  @Post('add')
  create(@Body() userData: UserDto) {
    return this.userService.createData(userData);
  }
  @Put('update')
  update(@Param('id') id: string, @Body() data: UserDto) {
    return this.userService.updateData(id, data);
  }
  @Delete('delete')
  delete(@Param('id') id: string) {
    return this.userService.deleteData(id);
  }
}
