import { IsNumber, IsString, IsEmail, Length, IsIn, IsDateString, Contains, Min, Max } from 'class-validator';

export class CreditCardDto {
  @IsNumber()
  @Min(1000000000000)
  @Max(10000000000000000)
  card_number: number;

  @IsNumber()
  @Min(100)
  @Max(1000)
  cvv: number;

  @IsString()
  @IsIn(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
  expiration_month: string;

  @IsDateString()
  @Length(4, 4)
  expiration_year: string;

  @IsString()
  @IsEmail()
  @Length(5, 100)
  email: string;
}
