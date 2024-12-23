import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  idIncrement = 1;
  database: CreateBudgetDto[] = [];
  create(createBudgetDto: Omit<CreateBudgetDto, 'id'>): CreateBudgetDto {
    const dataAddId = { ...createBudgetDto, id: this.idIncrement };
    this.idIncrement += 1;
    this.database.push(dataAddId);
    return dataAddId;
  }

  findAll() {
    return this.database;
  }

  findOne(id: number): CreateBudgetDto {
    const oneData = this.database.findIndex((data) => data.id == id);
    return this.database[oneData];
  }

  update(
    id: number,
    updateBudgetDto: Omit<UpdateBudgetDto, 'id'>,
  ): CreateBudgetDto {
    const oneData = this.database.findIndex((data) => data.id == id);
    this.database[oneData] = { ...this.database[oneData], ...updateBudgetDto };
    return this.database[oneData];
  }

  remove(id: number) {
    const oneData = this.database.findIndex((data) => data.id == id);

    return this.database.splice(oneData, 1);
  }
}
