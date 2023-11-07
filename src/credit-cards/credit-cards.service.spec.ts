import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsService } from './credit-cards.service';
import { Result, Error } from '../error-management/error-management';
import { SecureStorageService } from '../secure-storage/secure-storage.service';

describe('CreditCardsService', () => {
  let service: CreditCardsService;
  let secureStorageService: SecureStorageService;

  class SecureStorageServiceModel {
    static encrypt = () => 'prueba';
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditCardsService,
        {
          provide: SecureStorageService,
          useValue: SecureStorageServiceModel,
        },
      ],
    }).compile();

    service = module.get<CreditCardsService>(CreditCardsService);
  });

  describe('servicio de encriptacion', () => {
    it('probar que esta encriptando y devolviendo un string', () => {
      const result = service.encryptCreditCardDetails(
        456,
        456,
        '06',
        '2028',
        'prueba@gmail.com',
      );
      console.log(result);
      expect(result.cardNumber).toBe('prueba');
    });
  });

  describe('revisar si la tarjeta de credito es valida', () => {
    it('deberia devolverme exitoso', () => {
      const result = service.isCreditCardValid(4532015112830366);
      console.log(result);
      expect(result).toBeInstanceOf(Result);
    })

    it('Deberia devolverme error', () => {
      const result = service.isCreditCardValid(1);
      expect(result).toBeInstanceOf(Error);
    })
  });
});