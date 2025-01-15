import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column('decimal')
  price: number;

  @Column({ length: 50 })
  info: string;

  @Column({ default: true })
  is_active: boolean;

  @Column('int')
  quantity: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order_products: OrderProduct[];
}
