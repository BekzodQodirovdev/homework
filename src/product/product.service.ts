import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const resualt = await this.productRepository.save(createProductDto);
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
      const products = await this.productRepository.find();
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

    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 3600);
    // console.log('Cache miss');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const result = await this.productRepository.update(id, updateProductDto);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found or update failed');
    }
    const updatedProduct = await this.productRepository.findOneBy({ id });
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
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
    await this.redis.del(`product:${id}`);

    return { massage: 'Deleted' };
  }
}
