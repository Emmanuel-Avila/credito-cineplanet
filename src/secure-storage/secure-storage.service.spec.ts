import { Test, TestingModule } from '@nestjs/testing';
import { SecureStorageService } from './secure-storage.service';

describe('SecureStorageService', () => {
  let service: SecureStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecureStorageService],
    }).compile();

    service = module.get<SecureStorageService>(SecureStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
