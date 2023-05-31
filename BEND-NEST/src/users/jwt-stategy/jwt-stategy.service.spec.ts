import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategyService } from './jwt-stategy.service';

describe('JwtStategyService', () => {
  let service: JwtStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategyService],
    }).compile();

    service = module.get<JwtStrategyService>(JwtStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
