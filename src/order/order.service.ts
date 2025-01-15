import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    readonly orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: {
        user: true,
        order_products: true,
      },
    });

    if (!orders.length) {
      throw new NotFoundException('orders not found');
    }
    return orders;
  }

  async findOne(id: string) {
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
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    return this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException('orders not found');
    }
    return this.orderRepository.remove(order);
  }
}
