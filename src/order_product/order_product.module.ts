import { Module } from '@nestjs/common';
import { OrderProductService } from './order_product.service';
import { OrderProductController } from './order_product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { order_productProviders } from './entities/order_product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderProductController],
  providers: [...order_productProviders, OrderProductService],
})
export class OrderProductModule {}
