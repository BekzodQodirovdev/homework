import { OrderEnum } from 'src/enum/order.enum';
import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: OrderEnum, default: OrderEnum.PROCESSING })
  status: OrderEnum;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order_products: OrderProduct[];
}
