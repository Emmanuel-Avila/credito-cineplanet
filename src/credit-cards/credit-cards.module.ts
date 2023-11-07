import { Module } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardsController } from './credit-cards.controller';
import { SecureStorageService } from '../secure-storage/secure-storage.service';

@Module({
  controllers: [CreditCardsController],
  providers: [CreditCardsService, SecureStorageService],
})
export class CreditCardsModule {}
