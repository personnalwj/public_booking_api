import { Module } from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service';
import { TimeSlotsController } from './time-slots.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TimeSlot } from './entities/time-slot.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TimeSlot])],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
})
export class TimeSlotsModule {}
