import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comercios } from 'src/models/comercios.model';
import { Repository } from 'typeorm';

@Injectable()
export class CommerceService {
  constructor(@InjectRepository(Comercios) private comerceRepository: Repository<Comercios>){

  }

  async findAll(): Promise<Comercios[]>{
    return await this.comerceRepository.find();
  }

  async findCommerce(id:number): Promise<Comercios>{
    const commerce = await this.comerceRepository.findOneBy({id: id});
    if(!commerce){
      throw new NotFoundException('commerce not found');
    }
    return commerce;
  }

  checkHeader(headers: object): boolean{
    //revisar las key de los header

    return ('x-comercio-id' in headers);
  }

}
