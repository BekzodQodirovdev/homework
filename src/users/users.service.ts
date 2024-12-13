import { Inject, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserDto } from './dto/create-users.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepo') private readonly userRepository: UserRepository,
  ) {}

  async getAllData(): Promise<User[]> {
    const users = await this.userRepository.getAllData();
    return users;
  }
  async getOneData(id: string): Promise<User> {
    const user = await this.userRepository.getOneData(id);
    return user;
  }
  async createData(data: UserDto): Promise<User> {
    const newUser = await this.userRepository.createData(data);
    return newUser;
  }
  async updateData(id: string, data: UserDto): Promise<User> {
    const updateUser = await this.userRepository.updateData(id, data);
    return updateUser;
  }
  async deleteData(id: string): Promise<User> {
    const deleteUser = await this.userRepository.deleteData(id);
    return deleteUser;
  }
}
