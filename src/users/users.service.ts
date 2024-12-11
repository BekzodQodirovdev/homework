import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UserDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<User>) {}

  async getAllData(): Promise<User[]> {
    const users = await this.usersModel.find();
    return users;
  }
  async getOneData(id: string): Promise<User> {
    const user = await this.usersModel.findOne({ _id: id });
    return user;
  }
  async createData(data: UserDto): Promise<User> {
    const newUser = new this.usersModel(data);
    await newUser.save();
    return newUser;
  }
  async updateData(id: string, data: UserDto): Promise<User> {
    const updateUser = await this.usersModel.findByIdAndUpdate(
      { _id: id },
      data,
    );
    return updateUser;
  }
  async deleteData(id: string): Promise<User> {
    const deleteUser = await this.usersModel.findByIdAndDelete({ _id: id });
    return deleteUser;
  }
}
