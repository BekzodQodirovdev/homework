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

    service.create(mocData);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create budget', () => {
    const data = mocData;
    const resualt = service.create(data);
    const mocResualt = { ...mocData, id: 2 };
    expect(resualt).toEqual(mocResualt);
  });

  it('find all', () => {
    const resualt = service.findAll();
    const mocResualt = [{ ...mocData, id: 1 }];
    expect(resualt).toEqual(mocResualt);
  });

  it('find one', () => {
    const resualt = service.findOne(1);
    const mocResualt = { ...mocData, id: 1 };
    expect(resualt).toEqual(mocResualt);
  });

  it('update one', () => {
    const resualt = service.update(1, mocData);
    const mocResualt = { ...mocData, id: 1 };
    expect(resualt).toEqual(mocResualt);
  });

  it('delete one', () => {
    const resualt = service.remove(1);
    const mocResualt = [{ ...mocData, id: 1 }];
    expect(resualt).toEqual(mocResualt);
  });
});
