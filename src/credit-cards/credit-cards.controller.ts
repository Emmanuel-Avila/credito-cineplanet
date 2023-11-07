import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardDto } from './dto/create-credit-card.dto';
import { Result } from 'src/error-management/error-management';


@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  create(@Body() body: CreditCardDto) {
    const result = this.creditCardsService.validateCreditCardDetails(body.email, body.card_number);



    if( result instanceof Result){
      const encriptedData = this.creditCardsService.encryptCreditCardDetails(body.card_number, body.cvv, body.expiration_month, body.expiration_year, body.email,);
      const data = this.creditCardsService.decryptCreditCardDetails(encriptedData);
      return {encriptedData, data};
    }

    throw new HttpException(
      result.message,
      result.code,
    );

  }

}
