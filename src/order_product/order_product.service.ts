import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';
import { DeepPartial, Repository } from 'typeorm';
import { OrderProduct } from './entities/order_product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @Inject('ORDER_PRODUCT_REPOSITORY')
    readonly orderProductRepository: Repository<OrderProduct>,
  ) {}
  create(createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductRepository.save(
      createOrderProductDto as DeepPartial<OrderProduct>,
    );
  }

  async findAll() {
    const or_prt_data = await this.orderProductRepository.find();
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    return or_prt_data;
  }

  async findOne(id: string) {
    const or_prt_data = await this.orderProductRepository.findOneBy({ id: id });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    return or_prt_data;
  }

  async update(id: string, updateOrderProductDto: UpdateOrderProductDto) {
    let or_prt_data = await this.orderProductRepository.findOneBy({ id: id });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    or_prt_data = {
      ...or_prt_data,
      ...updateOrderProductDto,
    };
    return this.orderProductRepository.save(or_prt_data);
  }

  async remove(id: string) {
    const or_prt_data = await this.orderProductRepository.findOneBy({ id: id });
    if (!or_prt_data) {
      throw new NotFoundException('Order Product not found');
    }
    return this.orderProductRepository.remove(or_prt_data);
  }
}
