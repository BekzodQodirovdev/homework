import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private usersModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.usersModel(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    const user = await this.usersModel.find();
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersModel.findOne({ _id: id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
    );
  }

  async remove(id: string) {
    const user = await this.usersModel.findByIdAndDelete({ _id: id });
  }
}
