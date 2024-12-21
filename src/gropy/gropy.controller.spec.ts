import { Test, TestingModule } from '@nestjs/testing';
import { GropyController } from './gropy.controller';
import { GropyService } from './gropy.service';

describe('GropyController', () => {
  let controller: GropyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GropyController],
      providers: [GropyService],
    }).compile();

    controller = module.get<GropyController>(GropyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
