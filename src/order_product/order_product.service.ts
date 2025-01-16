import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order_product.entity';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class OrderProductService {
  constructor(
    @Inject('ORDER_PRODUCT_REPOSITORY')
    readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createOrderProductDto: CreateOrderProductDto) {
    const resualt = await this.orderProductRepository.save(
      createOrderProductDto,
    );
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
      const or_prt_data = await this.orderProductRepository.find({
        relations: {
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
    const or_prt_data = await this.orderProductRepository.findOneBy({ id: id });
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

  async update(id: string, updateOrderProductDto: UpdateOrderProductDto) {
    let or_prt_data = await this.orderProductRepository.findOneBy({ id: id });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    const resualt = await this.orderProductRepository.update(
      id,
      updateOrderProductDto,
    );
    if (resualt.affected === 0) {
      throw new NotFoundException('Order product not found or update failed');
    }
    const updateOrderProduct = await this.orderProductRepository.findOneBy({
      id,
    });
    await this.redis.set(
      `order_product:${id}`,
      JSON.stringify(updateOrderProduct),
      'EX',
      3600,
    );
    return updateOrderProduct;
  }

  async remove(id: string) {
    const or_prt_data = await this.orderProductRepository.findOneBy({ id: id });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    await this.orderProductRepository.remove(or_prt_data);
    await this.redis.del(`order_product:${id}`);
    return { massage: 'Deleted' };
  }
}
