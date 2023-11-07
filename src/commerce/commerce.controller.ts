import { BadRequestException, Controller, Get, NotFoundException, Param, Req } from '@nestjs/common';
import { CommerceService } from './commerce.service';
@Controller('commerce')
export class CommerceController {

  constructor (private readonly commerceService: CommerceService){

  }

  @Get('commerces')
  async findAll() {
    const commerces = await this.commerceService.findAll();
    if(!commerces){
      throw new NotFoundException('database empty!');
    }
    return commerces;
  }

  @Get('headers')
  async find(@Req() req) {
    const headers: object = req.headers;

    if(!(this.commerceService.checkHeader(headers))){
      throw new BadRequestException('Missing Headers');
    }

    return await this.commerceService.findCommerce(headers['x-comercio-id']);
  }
}
