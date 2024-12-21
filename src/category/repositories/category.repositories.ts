import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll<Category>();
  }

  async findOne(id: number) {
    return this.categoryModel.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.update(updateCategoryDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.categoryModel.destroy({
      where: {
        id,
      },
    });
  }
}
