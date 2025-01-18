import { Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderProductService {
  constructor(
    readonly orderProductRepository: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createOrderProductDto: Prisma.OrderProductCreateInput) {
    const resualt = await this.orderProductRepository.orderProduct.create({
      data: createOrderProductDto,
    });
    await this.redis.set(
      `order_product:${resualt.id}`,
      JSON.stringify(resualt),
      'EX',
      3600,
    );
  }

  async findAll() {
    const redisData = await this.redis.keys(`order_product:*`);
    if (redisData.length > 0) {
      const orders = await this.redis.mget(redisData);
      return orders.map((order) => JSON.parse(order));
    } else {
      const or_prt_data =
        await this.orderProductRepository.orderProduct.findMany({
          select: {
            id: true,
            quantity: true,
            order: true,
            product: true,
          },
        });
      if (!or_prt_data) {
        throw new NotFoundException('Order Product not found');
      }
      or_prt_data.forEach(async (or_prt) => {
        await this.redis.set(
          `order_product:${or_prt.id}`,
          JSON.stringify(or_prt),
          'EX',
          3600,
        );
      });
      return or_prt_data;
    }
  }

  async findOne(id: string) {
    const cacheorderProduct = await this.redis.get(`order_product:${id}`);
    if (cacheorderProduct) {
      return JSON.parse(cacheorderProduct);
    }
    const or_prt_data =
      await this.orderProductRepository.orderProduct.findFirst({
        where: { id },
      });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    await this.redis.set(
      `order_product:${or_prt_data.id}`,
      JSON.stringify(or_prt_data),
      'EX',
      3600,
    );
    return or_prt_data;
  }

  async update(
    id: string,
    updateOrderProductDto: Prisma.OrderProductUpdateInput,
  ) {
    let or_prt_data = await this.orderProductRepository.orderProduct.findFirst({
      where: { id },
    });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    const resualt = await this.orderProductRepository.orderProduct.update({
      where: { id },
      data: updateOrderProductDto,
    });
    await this.redis.set(
      `order_product:${id}`,
      JSON.stringify(resualt),
      'EX',
      3600,
    );
    return resualt;
  }

  async remove(id: string) {
    const or_prt_data =
      await this.orderProductRepository.orderProduct.findFirst({
        where: { id },
      });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    await this.orderProductRepository.orderProduct.delete({ where: { id } });
    await this.redis.del(`order_product:${id}`);
    return { massage: 'Deleted' };
  }
}
