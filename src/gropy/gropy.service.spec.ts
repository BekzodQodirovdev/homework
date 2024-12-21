import { Test, TestingModule } from '@nestjs/testing';
import { GropyService } from './gropy.service';

describe('GropyService', () => {
  let service: GropyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GropyService],
    }).compile();

    service = module.get<GropyService>(GropyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
