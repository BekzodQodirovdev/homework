import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './entities/order.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...productProviders, OrderService],
})
export class OrderModule {}
