import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from 'src/hashed/hashpassword';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<CreateUserDto, 'password'>> {
    const updatePassword = await hashPassword(createUserDto.password);

    const newUser = new this.userModel({
      createUserDto,
      password: updatePassword,
    });
    await newUser.save();
    const chengeUser = newUser.toObject();
    delete chengeUser.password;
    return chengeUser;
  }

  async findAll(): Promise<CreateUserDto[]> {
    const users = await this.userModel.find();
    return users;
  }

  findOne(id: string): Promise<CreateUserDto> {
    return this.userModel.findOne({ _id: id });
  }
  findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
    return this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto);
  }

  remove(id: string): Promise<CreateUserDto> {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
}
