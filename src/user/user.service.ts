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
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.save(createUserDto);

    const userData = {
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      phone: newUser.phone,
    };
    await this.redis.set(
      `user:${userData.id}`,
      JSON.stringify(userData),
      'EX',
      3600,
    );
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const redisData = await this.redis.keys('order:*');
    if (redisData.length > 0) {
      const user = await this.redis.mget(redisData);
      return user.map((user) => JSON.parse(user));
    } else {
      const users = await this.userRepository.find({
        select: ['id', 'fullname', 'email', 'phone'],
        skip: skip,
        take: page,
      });

      if (!users.length) {
        throw new NotFoundException('User not found');
      }
      users.forEach(async (user) => {
        await this.redis.set(
          `user:${user.id}`,
          JSON.stringify(user),
          'EX',
          3600,
        );
      });
      return users;
    }
  }

  async findOne(id: string) {
    const cacheUser = await this.redis.get(`user:${id}`);
    if (cacheUser) {
      return JSON.parse(cacheUser);
    }
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'fullname', 'email', 'phone'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let updateData = await this.userRepository.findOneBy({ id: id });
    if (!updateData) {
      throw new NotFoundException('User not found');
    }
    const resualt = await this.userRepository.update(id, updateUserDto);
    if (resualt.affected === 0) {
      throw new NotFoundException('User not found or update failed');
    }

    const updateUser = await this.userRepository.findOneBy({ id });

    if (updateUser) {
      await this.redis.set(
        `user:${id}`,
        JSON.stringify(updateUser),
        'EX',
        3600,
      );
    }

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
    await this.redis.del(`user:${id}`);

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    };
  }
}
