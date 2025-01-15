import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const resualt = await this.orderRepository.save(createOrderDto);
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
      const orders = await this.orderRepository.find({
        relations: {
          user: true,
        },
        select: {
          user: {
            id: true,
            fullname: true,
            email: true,
            phone: true,
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
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        order_products: true,
      },
    });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    await this.redis.set(`order:${id}`, JSON.stringify(order), 'EX', 3600);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    const resualt = await this.orderRepository.update(id, updateOrderDto);
    if (resualt.affected === 0) {
      throw new NotFoundException('Order not found or update failed');
    }
    const updateOrder = await this.orderRepository.findOneBy({ id });
    if (updateOrder) {
      await this.redis.set(
        `order:${id}`,
        JSON.stringify(updateOrder),
        'EX',
        3600,
      );
    }
    return updateOrder;
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    await this.orderRepository.remove(order);
    await this.redis.del(`order:${id}`);
    return { massage: 'Deleted' };
  }
}
