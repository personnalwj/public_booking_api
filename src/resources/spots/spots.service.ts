import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Spot } from './entities/spot.entity';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: EntityRepository<Spot>,
  ) {}
  create(createSpotDto: CreateSpotDto) {
    return 'This action adds a new spot';
  }

  findAll() {
    return this.spotRepository.findAll({
      populate: ['timeSlots'],
      limit: 10,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} spot`;
  }

  update(id: number, updateSpotDto: UpdateSpotDto) {
    return `This action updates a #${id} spot`;
  }

  remove(id: number) {
    return `This action removes a #${id} spot`;
  }
}
