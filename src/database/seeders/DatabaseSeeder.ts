import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { SpotFactory } from '../factories/spot.factory';
import { UserFactory } from '../factories/user.factory';
import { CongregationFactory } from '../factories/congregation.factory';
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

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new CongregationFactory(em)
      .each((congregation) => {
        congregation.members.set(new UserFactory(em).make(20));
        congregation.spots.set(new SpotFactory(em).make(20));
        congregation.responsible = new UserFactory(em).makeOne({
          congregation,
        });
      })
      .make(3);

    for (const timeSlot of timeSlots) {
      em.create(TimeSlot, timeSlot);
    }
  }
}
