import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createOrderDto: Prisma.OrderCreateInput) {
    const resualt = await this.orderRepository.order.create({
      data: createOrderDto,
    });
    await this.redis.set(
      `order:${resualt.id}`,
      JSON.stringify(resualt),
      'EX',
      3600,
    );
    return resualt;
  }

  async findAll() {
    const redisData = await this.redis.keys('order:*');
    if (redisData.length > 0) {
      const orders = await this.redis.mget(redisData);
      return orders.map((order) => JSON.parse(order));
    } else {
      const orders = await this.orderRepository.order.findMany({
        select: {
          id: true,
          total_price: true,
          status: true,
          OrderProduct: true,
          user: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },
        },
      });
      if (!orders.length) {
        throw new NotFoundException('orders not found');
      }
      orders.forEach(async (order) => {
        await this.redis.set(
          `order:${order.id}`,
          JSON.stringify(order),
          'EX',
          3600,
        );
      });
      return orders;
    }
  }

  async findOne(id: string) {
    const cacheOrder = await this.redis.get(`order:${id}`);
    if (cacheOrder) {
      return JSON.parse(cacheOrder);
    }
    const order = await this.orderRepository.order.findFirst({
      where: { id: id },
      select: {
        id: true,
        total_price: true,
        status: true,
        OrderProduct: true,
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    await this.redis.set(`order:${id}`, JSON.stringify(order), 'EX', 3600);
    return order;
  }

  async update(id: string, updateOrderDto: Prisma.OrderUpdateInput) {
    let order = await this.orderRepository.order.findFirst({ where: { id } });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    const resualt = await this.orderRepository.order.update({
      where: { id },
      data: updateOrderDto,
    });
    if (resualt) {
      await this.redis.set(`order:${id}`, JSON.stringify(resualt), 'EX', 3600);
    }
    return resualt;
  }

  async remove(id: string) {
    const order = await this.orderRepository.order.findFirst({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    await this.orderRepository.order.delete({ where: { id } });
    await this.redis.del(`order:${id}`);
    return { massage: 'Deleted' };
  }
}
