import { Inject, Injectable } from '@nestjs/common';
import { Gropy } from '../entities/gropy.entity';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@Injectable()
export class GropyRepository {
  constructor(@Inject('GROPY_REPOSITORY') private gropyModel: typeof Gropy) {}

  async create(createGropyDto) {
    return this.gropyModel.create(createGropyDto);
  }

  async findAll(): Promise<Gropy[]> {
    return this.gropyModel.findAll();
  }

  async findOne(id: number): Promise<Gropy> {
    return this.gropyModel.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.gropyModel.update(updateCategoryDto, { where: { id } });
  }

  async remove(id: number) {
    return this.gropyModel.destroy({
      where: {
        id,
      },
    });
  }
}
