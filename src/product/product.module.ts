import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './entities/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders,ProductService],
})
export class ProductModule {}
