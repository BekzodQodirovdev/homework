import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.save(createUserDto);
    return {
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      phone: newUser.phone,
    };
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'fullname', 'email', 'phone'],
    });

    if (!users.length) {
      throw new NotFoundException('User not found');
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'fullname', 'email', 'phone'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let updateData = await this.userRepository.findOneBy({ id: id });
    if (!updateData) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, updateUserDto);

    return { massage: 'Updated' };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    };
  }
}
