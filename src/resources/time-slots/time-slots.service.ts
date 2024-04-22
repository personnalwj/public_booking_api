import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TimeSlot } from './entities/time-slot.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UUID } from 'crypto';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: EntityRepository<TimeSlot>,
  ) {}
  create(createTimeSlotDto: CreateTimeSlotDto) {
    return 'This action adds a new timeSlot';
  }

  findAll() {
    try {
      return this.timeSlotRepository.findAll();
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Internal server error', 500);
    }
  }

  async findOne(id: UUID) {
    try {
      return this.timeSlotRepository.findOneOrFail(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('TimeSlot not found', 404);
    }
  }

  update(id: number, updateTimeSlotDto: UpdateTimeSlotDto) {
    return `This action updates a #${id} timeSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeSlot`;
  }
}
