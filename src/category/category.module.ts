import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { CategoryRepository } from './repositories/category.repositories';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,...categoryProviders,CategoryRepository],
})
export class CategoryModule {}
