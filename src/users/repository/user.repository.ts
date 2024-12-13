import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from '../dto/create-users.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async getAllData(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
  async getOneData(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }
  async createData(data: UserDto): Promise<User> {
    const newUser = new this.userModel(data);
    await newUser.save();
    return newUser;
  }
  async updateData(id: string, data: UserDto): Promise<User> {
    const updateUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      data,
    );
    return updateUser;
  }
  async deleteData(id: string): Promise<User> {
    const deleteUser = await this.userModel.findByIdAndDelete({ _id: id });
    return deleteUser;
  }
}
