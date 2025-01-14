import { DataSource } from 'typeorm';
import { OrderProduct } from './order_product.entity';

export const order_productProviders = [
  {
    provide: 'ORDER_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderProduct),
    inject: ['DATA_SOURCE'],
  },
];
