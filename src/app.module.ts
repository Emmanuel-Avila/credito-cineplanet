import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { APP_PIPE } from '@nestjs/core';
import { SecureStorageModule } from './secure-storage/secure-storage.module';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Comercios } from './models/comercios.model';
import { CommerceService } from './commerce/commerce.service';
import { CommerceController } from './commerce/commerce.controller';
import { CommerceModule } from './commerce/commerce.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController, CommerceController],
  providers: [    
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    TypeormService,
    CommerceService,],
  imports: [CreditCardsModule, SecureStorageModule, 
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Comercios]),
    CommerceModule,
    ConfigModule.forRoot({ isGlobal: true})
  ],
})
export class AppModule {}
