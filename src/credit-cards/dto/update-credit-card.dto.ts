import { PartialType } from '@nestjs/mapped-types';
import { CreditCardDto } from './create-credit-card.dto';

export class UpdateCreditCardDto extends PartialType(CreditCardDto) {}
