import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { UpdateCongregationDto } from './dto/update-congregation.dto';
import { Congregation } from './entities/congregation.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UUID } from 'crypto';

@Injectable()
export class CongregationsService {
  constructor(
    @InjectRepository(Congregation)
    private readonly congregationRepository: EntityRepository<Congregation>,
  ) {}
  create(createCongregationDto: CreateCongregationDto) {
    return 'This action adds a new congregation';
  }

  findAll() {
    try {
      return this.congregationRepository.findAll();
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Internal server error', 500);
    }
  }

  findOne(id: UUID) {
    try {
      return this.congregationRepository.findOneOrFail(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Congregation not found', 404);
    }
  }

  update(id: number, updateCongregationDto: UpdateCongregationDto) {
    return `This action updates a #${id} congregation`;
  }

  remove(id: number) {
    return `This action removes a #${id} congregation`;
  }
}
