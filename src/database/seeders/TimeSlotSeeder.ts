import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TimeSlot } from 'src/resources/time-slots/entities/time-slot.entity';

const timeSlots = [
  { startTime: '08:00:00', endTime: '08:30:00' },
  { startTime: '08:30:00', endTime: '09:00:00' },
  { startTime: '09:00:00', endTime: '09:30:00' },
  { startTime: '09:30:00', endTime: '10:00:00' },
  { startTime: '10:00:00', endTime: '10:30:00' },
  { startTime: '10:30:00', endTime: '11:00:00' },
  { startTime: '11:00:00', endTime: '11:30:00' },
  { startTime: '11:30:00', endTime: '12:00:00' },
  { startTime: '12:00:00', endTime: '12:30:00' },
  { startTime: '12:30:00', endTime: '13:00:00' },
  { startTime: '13:00:00', endTime: '13:30:00' },
  { startTime: '13:30:00', endTime: '14:00:00' },
  { startTime: '14:00:00', endTime: '14:30:00' },
  { startTime: '14:30:00', endTime: '15:00:00' },
  { startTime: '15:00:00', endTime: '15:30:00' },
  { startTime: '15:30:00', endTime: '16:00:00' },
  { startTime: '16:00:00', endTime: '16:30:00' },
  { startTime: '16:30:00', endTime: '17:00:00' },
  { startTime: '17:00:00', endTime: '17:30:00' },
  { startTime: '17:30:00', endTime: '18:00:00' },
  { startTime: '18:00:00', endTime: '18:30:00' },
  { startTime: '18:30:00', endTime: '19:00:00' },
  { startTime: '19:00:00', endTime: '19:30:00' },
  { startTime: '19:30:00', endTime: '20:00:00' },
];

export class TimeSlotSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const timeSlot of timeSlots) {
      em.create(TimeSlot, timeSlot);
    }
    em.flush();
  }
}
