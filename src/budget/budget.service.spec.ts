import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';

const mocData = {
  name: 'Non',
  price: 20000,
  description: 'Yeyish uchun',
  date: new Date(),
  status: true,
};
describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetService],
    }).compile();

    service = module.get<BudgetService>(BudgetService);

    const resualt = service.create(mocData);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
