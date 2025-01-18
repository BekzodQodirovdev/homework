import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const user = await this.userRepository.user.findMany({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.user.create({
      data: createUserDto,
    });

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

  async findAll(q: string = '', page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = skip + limit - 1;
    // const redisData = await this.redis.keys('user:*');
    const redisData = await this.redis.lrange('user:*', skip, take);

    if (redisData.length > 0) {
      const user = await this.redis.mget(redisData);
      return user.map((user) => JSON.parse(user));
    } else if (q !== '') {
      const users = await this.userRepository.user.findMany({
        where: { fullname: q },
        select: {
          id: true,
          fullname: true,
          email: true,
          phone: true,
        },
        skip: skip,
        take: take,
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
    } else if (q === '') {
      const users = await this.userRepository.user.findMany({
        select: {
          id: true,
          fullname: true,
          email: true,
          phone: true,
        },
        skip: skip,
        take: take,
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
    const user = await this.userRepository.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        fullname: true,
        email: true,
        phone: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
    return user;
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    let updateData = await this.userRepository.user.findFirst({
      where: { id },
    });
    if (!updateData) {
      throw new NotFoundException('User not found');
    }
    const resualt = await this.userRepository.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (resualt) {
      await this.redis.set(`user:${id}`, JSON.stringify(resualt), 'EX', 3600);
    }

    return { massage: 'Updated' };
  }

  async remove(id: string) {
    const user = await this.userRepository.user.delete({
      where: { id: id },
    });

    await this.redis.del(`user:${id}`);

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    };
  }
}
