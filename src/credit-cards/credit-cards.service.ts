import { Injectable } from '@nestjs/common';
import { CreditCardDto } from './dto/create-credit-card.dto';
import { Error, Result } from '../error-management/error-management';
import { SecureStorageService } from '../secure-storage/secure-storage.service';
import { CreditCardDetails, EncriptedCreditCardDetails } from './credit-card-types';

@Injectable()
export class CreditCardsService {
  constructor(private secureStorageService: SecureStorageService) {}

  create(createCreditCardDto: CreditCardDto) {
    return createCreditCardDto;
  }


  encryptCreditCardDetails(cardNumber: number, cvv: number, expirationMonth: string, expirationYear: string, email: string): EncriptedCreditCardDetails{

    let encryptedData:EncriptedCreditCardDetails = { cardNumber: '', cvv: '', expirationMonth: '', expirationYear: '', email: ''};
    encryptedData.cardNumber = this.secureStorageService.encrypt(cardNumber.toString());
    encryptedData.cvv = this.secureStorageService.encrypt(cvv.toString());
    encryptedData.expirationMonth = this.secureStorageService.encrypt(expirationMonth);
    encryptedData.expirationYear = this.secureStorageService.encrypt(expirationYear);
    encryptedData.email = this.secureStorageService.encrypt(email);

    return encryptedData;
  }

  decryptCreditCardDetails(encriptedData: EncriptedCreditCardDetails): CreditCardDetails{
    let data:CreditCardDetails = { cardNumber: 0, cvv: 0, expirationMonth: '', expirationYear: '', email: '', token: ''};
    data.cardNumber = parseInt(this.secureStorageService.decrypt(encriptedData.cardNumber));
    data.cvv = parseInt(this.secureStorageService.decrypt(encriptedData.cvv));
    data.expirationMonth = this.secureStorageService.decrypt(encriptedData.expirationMonth);
    data.expirationYear = this.secureStorageService.decrypt(encriptedData.expirationYear);
    data.email = this.secureStorageService.decrypt(encriptedData.email);
    data.token = this.secureStorageService.tokenGeneration();
    return data;
  }

  validateCreditCardDetails(email: string, creditCard: number): Error | Result<boolean>{
    const creditCardValidation = this.isCreditCardValid(creditCard);
    const emailValidation = this.checkIsEmailValid(email);

    //check if credit card number is valid
    if( !(creditCardValidation instanceof Result) ){
      return creditCardValidation;
    }

    //check if email is of a valid dominion
    if( !(emailValidation instanceof Result) ){
      return emailValidation;
    }

    return new Result(true);
  }
  
  checkIsEmailValid(email: string): Error | Result<boolean> {
    
    //list of acceptable email domains
    const validDominions = [ 'gmail.com', 'yahoo.es', 'hotmail.com' ];
    
    //iterate through the list and return a true variable if true
    for(const dom of validDominions){
      if (email.includes(dom)){
        return new Result(true)
      }
    }

    return new Error(
      400,
      `Email ${email} does not contain valid dominions`
    );
  }

  isCreditCardValid(creditCard: number): Error | Result<boolean>{

    const cardNumberStr: string = creditCard.toString();
    const reversedCardNumber = cardNumberStr.split('').reverse().join('');
    let sum = 0;

    for (let i = 0; i < reversedCardNumber.length; i++) {
      let digit = parseInt(reversedCardNumber[i], 10);
      
      if (i % 2 === 1) {
        digit *= 2;
        if (digit >= 10) {
          digit -= 9;
        }
      }
      
      sum += digit;
    }

    if( sum % 10 === 0 ){
      return new Result(true);
    }

    return new Error(
      400,
      `Credit card: ${creditCard} is not valid`
    );
  }

}
