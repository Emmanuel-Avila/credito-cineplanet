import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecureStorageService {
  //Llamo a la llave de encriptacion desde azure
  private secretKey: string = process.env['ENCRYPTION_KEY'];
  private secretVector:Buffer = crypto.randomBytes(12);
  private key = crypto.scryptSync(this.secretKey, 'salt', 32);
  //Guardaria esto en base de datos normalmente, para manejarlo de mejor manera
  private authTag: Buffer[] = [];
  private i: number = 0;
  private c: number = 0;

  encrypt(data: string): string{
    const cipher = crypto.createCipheriv('aes-256-gcm', this.key, this.secretVector);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    this.authTag[this.i] = cipher.getAuthTag();
    this.i++;
    return encryptedData;
  }
  
  decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, this.secretVector);
    decipher.setAuthTag(this.authTag[this.c]);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    this.c++;
    return decryptedData;
  }

  tokenGeneration() :string{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }
}
