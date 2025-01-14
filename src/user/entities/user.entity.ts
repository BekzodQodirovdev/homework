import { UserRole } from 'src/enum/user.enum';
import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column()
  phone: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: '' })
  refresh_token: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
