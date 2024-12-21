import { Injectable } from '@nestjs/common';
import { CreateGropyDto } from './dto/create-gropy.dto';
import { UpdateGropyDto } from './dto/update-gropy.dto';
import { GropyRepository } from './repositories/gropy.repositories';

@Injectable()
export class GropyService {
  constructor(private readonly gropyRepository: GropyRepository) {}
  create(createGropyDto: CreateGropyDto) {
    return this.gropyRepository.create(createGropyDto);
  }

  findAll() {
    return this.gropyRepository.findAll();
  }

  findOne(id: number) {
    return this.gropyRepository.findOne(id);
  }

  update(id: number, updateGropyDto: UpdateGropyDto) {
    return this.gropyRepository.update(id, updateGropyDto);
  }

  remove(id: number) {
    return this.gropyRepository.remove(id);
  }
}
