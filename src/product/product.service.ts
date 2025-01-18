import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createProductDto: Prisma.ProductCreateInput) {
    const resualt = await this.productRepository.product.create({
      data: createProductDto,
    });
    await this.redis.set(
      `product:${resualt.id}`,
      JSON.stringify(resualt),
      'EX',
      3600,
    );
    return resualt;
  }

  async findAll() {
    const redisData = await this.redis.keys('product:*');
    if (redisData.length > 0) {
      const products = await this.redis.mget(redisData);
      // console.log('cache hit');
      return products.map((product) => JSON.parse(product));
    } else {
      const products = await this.productRepository.product.findMany();
      if (!products.length) {
        throw new NotFoundException('Product not found');
      }
      products.forEach(async (product) => {
        await this.redis.set(
          `product:${product.id}`,
          JSON.stringify(product),
          'EX',
          3600,
        );
      });
      // console.log('cache miss');
      return products;
    }
  }

  async findOne(id: string) {
    const cachedProduct = await this.redis.get(`product:${id}`);
    if (cachedProduct) {
      // console.log('Cache hit');
      return JSON.parse(cachedProduct);
    }

    const product = await this.productRepository.product.findFirst({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 3600);
    // console.log('Cache miss');
    return product;
  }

  async update(id: string, updateProductDto: Prisma.ProductUpdateInput) {
    let product = await this.productRepository.product.findFirst({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const result = await this.productRepository.product.update({
      where: { id },
      data: updateProductDto,
    });
    const updatedProduct = await this.productRepository.product.findFirst({
      where: { id },
    });
    if (updatedProduct) {
      await this.redis.set(
        `product:${id}`,
        JSON.stringify(updatedProduct),
        'EX',
        3600,
      );
    }
    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.productRepository.product.findFirst({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.product.delete({ where: { id } });
    await this.redis.del(`product:${id}`);

    return { massage: 'Deleted' };
  }
}
