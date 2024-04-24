import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Spot } from './entities/spot.entity';
import { UUID } from 'crypto';

@Injectable()
export class SpotsService {
  private readonly logger = new Logger(SpotsService.name);
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: EntityRepository<Spot>,
  ) {}
  create(createSpotDto: CreateSpotDto) {
    try {
      this.spotRepository.create(createSpotDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        ...error,
        code: 500,
        message: 'Internal server error',
      });
    }
  }

  findAll() {
    return this.spotRepository.findAll({
      populate: ['timeSlots'],
    });
  }

  findOne(id: UUID) {
    try {
      return this.spotRepository.findOneOrFail(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Spot not found', 404);
    }
  }

  update(id: number, updateSpotDto: UpdateSpotDto) {
    return `This action updates a #${id} spot`;
  }

  remove(id: number) {
    return `This action removes a #${id} spot`;
  }
}
