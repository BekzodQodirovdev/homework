import { Injectable } from '@nestjs/common';
// import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

interface CreateBudgetDto {
  id: number;
  name: string;
  price: number;
  description: string;
  date: Date;
  status: boolean;
}

@Injectable()
export class BudgetService {
  database: CreateBudgetDto[] = [];
  idIncrement = 1;
  create(createBudgetDto: Omit<CreateBudgetDto, 'id'>): CreateBudgetDto {
    const dataAddId = { ...createBudgetDto, id: this.idIncrement };
    this.idIncrement += 1;
    this.database.push(dataAddId);
    return this.database[this.idIncrement - 1];
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
    updateBudgetDto: Omit<CreateBudgetDto, 'id'>,
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
