import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order_product/order_product.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule, OrderModule, OrderProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
