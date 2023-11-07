import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsService } from './credit-cards.service';
import { Result, Error } from "../error-management/error-management";

describe('CreditCardsService', () => {
  let service: CreditCardsService;
  let fakeCreditCardValidator: Partial<CreditCardsService>

  beforeEach(async () => {
    
    fakeCreditCardValidator = {
      isCreditCardValid: (creditCard: number): Result<boolean> | Error => {
        if( creditCard === 4556737586899855 ){
          return new Result(true);
        }
        return new Error(
          400,
          `Credit card: ${creditCard} is not valid`
          );
        }
      }

      const module: TestingModule = await Test.createTestingModule({
        providers: [CreditCardsService],
      }).compile();

      service = module.get<CreditCardsService>(CreditCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
