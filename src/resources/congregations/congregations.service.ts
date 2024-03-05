import { Injectable } from '@nestjs/common';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { UpdateCongregationDto } from './dto/update-congregation.dto';

@Injectable()
export class CongregationsService {
  create(createCongregationDto: CreateCongregationDto) {
    return 'This action adds a new congregation';
  }

  findAll() {
    return `This action returns all congregations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} congregation`;
  }

  update(id: number, updateCongregationDto: UpdateCongregationDto) {
    return `This action updates a #${id} congregation`;
  }

  remove(id: number) {
    return `This action removes a #${id} congregation`;
  }
}
