import { Module } from '@nestjs/common';
import { SecureStorageService } from './secure-storage.service';

@Module({
  providers: [SecureStorageService]
})
export class SecureStorageModule {}
