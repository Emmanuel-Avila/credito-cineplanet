export type CreditCardDetails = {
  cardNumber: number; 
  cvv: number, 
  expirationMonth: string; 
  expirationYear: string; 
  email: string;
  token: string;
}

export type EncriptedCreditCardDetails = {
  cardNumber: string; 
  cvv: string, 
  expirationMonth: string; 
  expirationYear: string; 
  email: string;
}