import { Test, TestingModule } from '@nestjs/testing';
import { CommerceService } from './commerce.service';

describe('CommerceService', () => {
  let service: CommerceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommerceService],
    }).compile();

    service = module.get<CommerceService>(CommerceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
